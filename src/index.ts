import { getInput, setFailed, warning } from '@actions/core';
import { context } from '@actions/github';

import { getData } from './get-data';
import makeComment from './make-comment';
import sendDataComment from './send-data';
import sendDataDiff from './send-data-diff';

const run = async (): Promise<void> => {
  try {
    const url = getInput('coverageEndpoint');
    const authToken = undefined
    const prData = await getData(authToken);

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
    console.log(`Lines percent difference: ${prData.coverage.lines.diff}`);
    console.log(`Functions difference: ${prData.coverage.functions.diff}`);
    console.log(`Branches difference: ${prData.coverage.branches.diff}`);

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
