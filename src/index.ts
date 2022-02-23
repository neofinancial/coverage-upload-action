import { getInput, setFailed } from '@actions/core';
import { context } from '@actions/github';

import getData from './get-data';
import throwError from './lib/error-handling';
import makeComment from './make-comment';
import sendData from './send-data';

const run = async (): Promise<void> => {
  try{
    const prData = await getData();
  
    let url
    try{
      url = getInput('coverageEndpoint');
    }catch(error){
      throwError(error,'Failed to retrieve url from action. See configuration for instructions on how to add covergeEndpoint to action.' )
    }

    if (url) {
      try {
        const coverage = await sendData(url, prData!);
        if(coverage){ 
          prData!.coverage = coverage 
        }
      } catch (error) {
        console.log(`${error}, Could not send data, printing comment`);
      }
    }

    console.log(`Repo ID: ${prData!.repositoryId}`);
    console.log(`Ref of branch being merged: ${prData!.ref}`);
    console.log(`Ref of branch being merged into: ${prData!.baseRef}`);
    console.log(`SHA of merge commit: ${prData!.sha}`);
    console.log(`PR creator: ${prData!.actor}`);
    console.log(`Time PR created: ${prData!.timestamp}`);
    console.log(`Lines percent: ${prData!.coverage.lines.percent}`);
    console.log(`Functions percent: ${prData!.coverage.functions.percent}`);
    console.log(`Branches percent: ${prData!.coverage.branches.percent}`);
    console.log(prData!.coverage.lines.diff);
    console.log(prData!.coverage.functions.diff);
    console.log(prData!.coverage.branches.diff);

    if (prData!.pullRequest) {
      console.log(prData!.pullRequest);
    }

    if (context.payload.pull_request) {
      makeComment(prData!.coverage);
    }
  } catch (error) {
    setFailed(error.message);
  }
};

run();
