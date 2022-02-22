import { setFailed } from '@actions/core';
import { context } from '@actions/github';
import { Octokit } from '@octokit/action';

// import { CommentData } from './types';

// import constructComment from './construct-comment';

const makeComment = async (message?: string): Promise<void> => {
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
    console.log(message);

    if (!botComment) {
      octokit.issues.createComment({
        owner: owner,
        repo: repo,
        issue_number: pullRequestNumber,
        body: message ?? 'Message could not be constructed',
      });
    } else {
      octokit.issues.updateComment({
        owner: owner,
        repo: repo,
        comment_id: botComment.id,
        body: message ?? 'Message could not be constructed',
      });
    }
  } catch {
    throw new Error('Could not generate comment.');
  }
};

export default makeComment;
