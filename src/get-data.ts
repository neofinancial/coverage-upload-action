import { getInput, setFailed } from '@actions/core';
import { context } from '@actions/github';

import getCoverage from './get-coverage';
import throwError from './lib/error-handling';
import { PRData } from './types';

const getData = async (): Promise<PRData | void> => {
  const authToken = getInput('coverageToken');

  if (!authToken) {
    setFailed(
      'Failed to retrieve authToken from action. See configuration for instructions on how to add covergeToken to action.'
    );

    return;
  }

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
  } else {
    throw new Error('Error: Issue with context');
  }

  let coverageData;

  try {
    coverageData = getInput('coverageData');
  } catch (error) {
    throwError(error, 'Failed to grab file ./coverage/lcov.info.');

    return;
  }

  let commentData;

  try {
    commentData = await getCoverage(coverageData);
  } catch (error) {
    console.log(error)
    throwError(error, 'meow');

    return;
  }

  if (commentData) {
    prData.coverage.lines = commentData?.lines;
    prData.coverage.functions = commentData?.functions;
    prData.coverage.branches = commentData?.branches;
  }

  return prData;
};

export default getData;
