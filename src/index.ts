import { getInput, setFailed } from '@actions/core';
import { context } from '@actions/github';

import getData from './get-data';
import makeComment from './make-comment';
import sendData from './send-data';

const run = async (): Promise<void> => {
  try {
    const prData = await getData();

    const url = getInput('coverageEndpoint');
    if(!url){
      console.warn('Failed to retrieve `coverageEndpoint` from action. See configuration for instructions on how to add covergeEndpoint to action.');
    }

    if (url) {
      try {
        prData.coverage = await sendData(url, prData);
      } catch (error) {
        console.warn('Failed to send data to endpoint. Printing comment...');
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
      makeComment(prData.coverage);
    }
  } catch (error) {
    setFailed(error.message);
  }
};

run();
