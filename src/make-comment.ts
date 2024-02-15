import { setFailed } from '@actions/core';
import { context } from '@actions/github';
import { Octokit } from '@octokit/action';

import constructComment from './construct-comment';

import { CommentData } from './types';

const makePullRequestComment = async (message: string | undefined, commentData: CommentData): Promise<void> => {
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

    console.log(botComment);
    console.log(commentData);

    const body = message ?? (await constructComment(commentData));

    if (botComment) {
      octokit.issues.updateComment({
        owner: owner,
        repo: repo,
        comment_id: botComment.id,
        body,
      });
    } else {
      octokit.issues.createComment({
        owner: owner,
        repo: repo,
        issue_number: pullRequestNumber,
        body,
      });
    }
  } catch {
    throw new Error('Could not generate comment.');
  }
};

export default makePullRequestComment;
