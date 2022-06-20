import { getInput, setFailed, warning } from '@actions/core';
import { context } from '@actions/github';

import { getPullRequestData } from './get-data';
import getConfiguration, { PathProperties } from './get-coverage-properties';
import makePullRequestComment from './make-comment';
import sendPullRequestData from './send-data';
import { CommentData, PullRequestData } from './types';
import { getMonoRepoCoverage } from './get-coverage';

const run = async (): Promise<void> => {
  try {
    const url = getInput('coverageEndpoint');
    const authToken = getInput('coverageToken');
    const constructedPrData: PullRequestData[] = [];

    if (!authToken && url) {
      warning(
        'Failed to retrieve `coverageToken`. See configuration for instructions on how to add coverageToken to action.'
      );
    } else if (!url && authToken) {
      warning(
        'Failed to retrieve `coverageEndpoint` from action. See configuration for instructions on how to add covergeEndpoint to action.'
      );
    }

    const coverageConfiguration: PathProperties[] = await getConfiguration();

    const coverageConfigurationPromise = coverageConfiguration.map(async (configuration) => {
      const splitConfigurationPath = configuration.path.split('/');
      const configurationPath =
        splitConfigurationPath[splitConfigurationPath.length - 1] === 'lcov.info'
          ? configuration.path
          : configuration.path.concat('lcov.info');

      constructedPrData.push(await getPullRequestData(configurationPath, configuration.displayName));
    });

    await Promise.all(coverageConfigurationPromise);

    if (url && authToken) {
      const coverageData: CommentData = await getMonoRepoCoverage(constructedPrData);
      const receivedPrData: PullRequestData = await sendPullRequestData(url, constructedPrData);

      console.log(`Repo ID: ${constructedPrData[0].repositoryId}`);
      console.log(`Ref of branch being merged: ${constructedPrData[0].ref}`);
      console.log(`Ref of branch being merged into: ${constructedPrData[0].baseRef}`);
      console.log(`SHA of merge commit: ${constructedPrData[0].sha}`);
      console.log(`PR creator: ${constructedPrData[0].actor}`);
      console.log(`Time PR created: ${constructedPrData[0].timestamp}`);
      console.log(`Lines percent: ${coverageData.lines.percent}`);
      console.log(`Functions percent: ${coverageData.functions.percent}`);
      console.log(`Branches percent: ${coverageData.branches.percent}`);

      if (receivedPrData.coverage.lines.diff || receivedPrData.coverage.lines.diff === 0) {
        console.log(`Lines difference: ${receivedPrData.coverage.lines.diff}`);
      }

      if (receivedPrData.coverage.functions.diff || receivedPrData.coverage.functions.diff === 0) {
        console.log(`Functions difference: ${receivedPrData.coverage.functions.diff}`);
      }

      if (receivedPrData.coverage.branches.diff || receivedPrData.coverage.branches.diff === 0) {
        console.log(`Branches Difference: ${receivedPrData.coverage.branches.diff}`);
      }

      if (receivedPrData.message) {
        console.log(`Message: ${receivedPrData.message}`);
      }

      if (constructedPrData[0].pullRequest) {
        console.log(`Pull Request Number: ${receivedPrData.pullRequest}`);
      }

      if (context.payload.pull_request) {
        await makePullRequestComment(receivedPrData.message, receivedPrData.coverage);
      }
    }
  } catch (error) {
    setFailed(`Coverage action failed to run: ${error.message}`);
  }
};

run();
