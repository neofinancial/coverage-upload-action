import { CommentData } from './types';
import { getCoverageDifferenceEmoji, getCoverageEmoji, getCoverageIncreaseOrDecreaseSign } from './construct-comment-utils';


const constructComment = async (commentData: CommentData): Promise<string> => {
  let message: string;

  if(commentData.lines.diff) {
    message = `
## Code Coverage

|           | Current Coverage                             | Difference After PR                                               |                                                                |
|-----------|----------------------------------------------|-------------------------------------------------------------------|--------------------------------------------------------------- |
| Lines     | ${commentData.lines.percent.toFixed(2)}%     | ${(commentData.lines.percent + commentData.lines.diff).toFixed(2)}% (${getCoverageIncreaseOrDecreaseSign(commentData.lines.diff)})      | ${getCoverageDifferenceEmoji(commentData.lines.diff)}     |
| Functions | ${commentData.functions.percent.toFixed(2)}% | ${(commentData.functions.percent + commentData.lines.diff).toFixed(2)}% (${getCoverageIncreaseOrDecreaseSign(commentData.functions.diff)})  | ${getCoverageDifferenceEmoji(commentData.functions.diff)} |
| Branches  | ${commentData.branches.percent.toFixed(2)}%  | ${(commentData.branches.percent + commentData.lines.diff.toFixed(2))}% (${getCoverageIncreaseOrDecreaseSign(commentData.branches.diff)})   | ${getCoverageDifferenceEmoji(commentData.branches.diff)}  |
<!-- coverage-action-comment -->
`;
  } else {
    message = `
## Code Coverage

|           | Current Coverage                             |                                                    |
|-----------|----------------------------------------------|----------------------------------------------------|
| Lines     | ${commentData.lines.percent.toFixed(2)}%     | ${getCoverageEmoji(commentData.lines.percent)}     |
| Functions | ${commentData.functions.percent.toFixed(2)}% | ${getCoverageEmoji(commentData.functions.percent)} |
| Branches  | ${commentData.branches.percent.toFixed(2)}%  | ${getCoverageEmoji(commentData.branches.percent)}  |

<!-- coverage-action-comment -->
`;
  }

  return message;
};

const testFunction =() => {
  const test = `import { getInput } from '@actions/core';
import { context } from '@actions/github';

import getCoverage from './get-coverage';
import { PRData } from './types';

const getData = async (): Promise<PRData> => {
  const authToken = getInput('coverageToken');

  const prData: PRData = {
    repositoryId: context.payload.repository?.id,
    ref: '',
    baseRef: '',
    sha: '',
    actor: '',
    timestamp: Date.now().toString(),
    coverage: {
      lines: { hit: 0, found: 0, percent: 0, diff: 0 },
      functions: { hit: 0, found: 0, percent: 0, diff: 0 },
      branches: { hit: 0, found: 0, percent: 0, diff: 0 },
    },
    token: authToken,
  };

  const info = context.payload;

  if (info.pull_request) {
    prData.ref = info.pull_request.head.ref;
    prData.baseRef = info.pull_request.base.ref;
    prData.sha = info.pull_request.head.sha;
    prData.timestamp = info.pull_request.created_at;
    prData.pullRequest = info.number;
  } else {
    prData.ref = info.ref.replace('refs/heads/', '');
    prData.baseRef = info.base_ref;
    prData.sha = info.after;
    prData.timestamp = info.head_commit.timestamp;
  }

  if (info.repository && info.sender) {
    prData.actor = info.sender.login;
  } else if (!info.repository && !info.sender) {
    throw new Error('repository and sender are undefined');
  } else if (!info.repository) {
    throw new Error('repository is undefined');
  } else {
    throw new Error('sender is undefined');
  }

  const coverageData = getInput('coverageData');

  const commentData = await getCoverage(coverageData);

  prData.coverage.lines = commentData.lines;
  prData.coverage.functions = commentData.functions;
  prData.coverage.branches = commentData.branches;

  return prData;
};

export default getData;`
}

testFunction()

export default constructComment;
