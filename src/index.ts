import { getInput, setFailed, warning } from '@actions/core';
import { context } from '@actions/github';

import { getData } from './get-data';
import getPathways from './get-pathways';
import makeComment from './make-comment';
import sendData from './send-data';

const run = async (): Promise<void> => {
  try {
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

    const coverageData = getInput('coverageData');

    const coveragePathways: string[] = await getPathways(coverageData);

    await Promise.all(
      coveragePathways.map(async (pathway) => {

        let prData = await getData(pathway);

        if (url) {
          try {
            prData = await sendData(url, prData);
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
        console.log(`Pathway to coverage file: ${prData.pathName}`);
        console.log(`Lines percent: ${prData.coverage.lines.percent}`);
        console.log(`Functions percent: ${prData.coverage.functions.percent}`);
        console.log(`Branches percent: ${prData.coverage.branches.percent}`);

        if (prData.coverage.lines.diff || prData.coverage.lines.diff === 0) {
          console.log(`Lines difference: ${prData.coverage.lines.diff}`);
        }

        if (prData.coverage.functions.diff || prData.coverage.functions.diff === 0) {
          console.log(`Functions difference: ${prData.coverage.functions.diff}`);
        }

        if (prData.message) {
          console.log(`Message: ${prData.message}`);
        }

        if (context.payload.pull_request) {
          makeComment(prData.coverage);
        }
      })
    );
  } catch (error) {
    setFailed(`Coverage action failed to run: ${error.message}`);
  }
};

run();
