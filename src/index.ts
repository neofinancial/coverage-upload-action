import { getInput, setFailed, warning } from '@actions/core';
import { context } from '@actions/github';

import getData from './get-data';
import makeComment from './make-comment';
import sendData from './send-data';

const run = async (): Promise<void> => {
  try {
    const prData = await getData();

    const url = getInput('coverageEndpoint');
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

    if (url) {
      try {
        prData.message = await sendData(url, prData);
      } catch (error) {
        console.log(`${error}, Could not send data, printing comment`);
      }
    }

    //console.log(prData.message)

    // console.log(`Repo ID: ${prData.repositoryId}`);
    // console.log(`Ref of branch being merged: ${prData.ref}`);
    // console.log(`Ref of branch being merged into: ${prData.baseRef}`);
    // console.log(`SHA of merge commit: ${prData.sha}`);
    // console.log(`PR creator: ${prData.actor}`);
    // console.log(`Time PR created: ${prData.timestamp}`);
    // console.log(`Lines percent: ${prData.coverage.lines.percent}`);
    // console.log(`Functions percent: ${prData.coverage.functions.percent}`);
    // console.log(`Branches percent: ${prData.coverage.branches.percent}`);
    // console.log(prData.coverage.lines.diff);
    // console.log(prData.coverage.functions.diff);
    // console.log(prData.coverage.branches.diff);

    if (prData.pullRequest) {
      console.log(prData.pullRequest);
    }

    if (context.payload.pull_request) {
      makeComment(prData.message);
    }
  } catch (error) {
    setFailed(`Coverage action failed to run: ${error.message}`);
  }
};

run();
