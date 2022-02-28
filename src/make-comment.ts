import { getInput, setFailed } from '@actions/core';
import { context } from '@actions/github';
import { Octokit } from '@octokit/action';

import constructComment from './construct-comment';

import { CommentData } from './types';

const makeComment = async (message: string, commentData: CommentData): Promise<void> => {
  try {
    if (!context.payload.pull_request) {
      setFailed('No pull requests found.');

      return;
    }

    const githubRepo = process.env.GITHUB_REPOSITORY;

    if (!githubRepo) {
      setFailed('No repo found');

      return;
    }

    const [owner, repo] = githubRepo.split('/');
    const pullRequestNumber = context.payload.pull_request.number;
    const octokit = new Octokit();

    const comments = await octokit.issues.listComments({
      owner,
      repo,
      issue_number: pullRequestNumber,
    });

    const botComment = comments.data.find((comment) => comment.body?.includes('<!-- coverage-action-comment -->'));
    const customMessage = getInput('customMessage');

    console.log(botComment);
    console.log(message);
    console.log(commentData);

    if (!botComment) {
      octokit.issues.createComment({
        owner: owner,
        repo: repo,
        issue_number: pullRequestNumber,
        body: customMessage === 'comment' ? message : await constructComment(commentData),
      });
    } else {
      octokit.issues.updateComment({
        owner: owner,
        repo: repo,
        comment_id: botComment.id,
        body: customMessage === 'comment' ? message : await constructComment(commentData),
      });
    }
  } catch {
    throw new Error('Could not generate comment.');
  }
};

export default makeComment;
