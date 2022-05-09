import { getInput, setFailed, warning } from '@actions/core';
import { context } from '@actions/github';

import { getAllData, getData } from './get-data';
import makeComment from './make-comment';
import sendDataComment from './send-data';
import sendDataDiff from './send-data-diff';
import testMonoRepo from './test-mono-repo';

const run = async (): Promise<void> => {
  try {
    const monoRepo = getInput('monoRepo');
    const url = getInput('coverageEndpoint');

    if (monoRepo === 'true') {
      await testMonoRepo(url, getAllData());

      return;
    }

    const prData = await getData();
    const authToken = getInput('coverageToken');

    if (!authToken && url) {
      warning(
        'Failed to retrieve `coverageToken`. See configuration for instructions on how to add coverageToken to action.'
      );
    } else if (!url && authToken) {
      warning(
        'Failed to retrieve `coverageEndpoint` from action. See configuration for instructions on how to add covergeEndpoint to action.'
      );
    }

    const customMessage = getInput('customMessage');

    if (url && authToken) {
      try {
        if (customMessage === 'comment') {
          prData.message = await sendDataComment(url, prData);
        } else {
          prData.coverage = await sendDataDiff(url, prData);
        }
      } catch (error) {
        console.log(`${error}, Could not send data, printing comment`);
      }
    }

    console.log(`Repo ID: ${prData.repositoryId}`);
    console.log(`Ref of branch being merged: ${prData.ref}`);
    console.log(`Ref of branch being merged into: ${prData.baseRef}`);
    console.log(`SHA of merge commit: ${prData.sha}`);
    console.log(`PR creator: ${prData.actor}`);
    console.log(`Time PR created: ${prData.timestamp}`);
    console.log(`Lines percent: ${prData.coverage.lines.percent}`);
    console.log(`Functions percent: ${prData.coverage.functions.percent}`);
    console.log(`Branches percent: ${prData.coverage.branches.percent}`);
    console.log(prData.coverage.lines.diff);
    console.log(prData.coverage.functions.diff);
    console.log(prData.coverage.branches.diff);

    if (prData.pullRequest) {
      console.log(prData.pullRequest);
    }

    if (context.payload.pull_request) {
      makeComment(prData.message as string, prData.coverage);
    }
  } catch (error) {
    setFailed(`Coverage action failed to run: ${error.message}`);
  }
};

run();
