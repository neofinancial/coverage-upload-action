import { getInput, setFailed, warning } from '@actions/core';
import { context } from '@actions/github';

import { getCoverageAfterPr, getCoverageDifferenceEmoji, getCoverageEmoji } from './construct-comment-utils';

import { getData } from './get-data';
import makePullRequestComment from './make-comment';
import sendPullRequestData from './send-data';

const run = async (): Promise<void> => {
  try {
    const url = getInput('coverageEndpoint');
    const authToken = getInput('coverageToken');
    const actionDebug = getInput('actionDebug');

    if (!authToken && url) {
      warning(
        'Failed to retrieve `coverageToken`. See configuration for instructions on how to add coverageToken to action.'
      );
    } else if (!url && authToken) {
      warning(
        'Failed to retrieve `coverageEndpoint` from action. See configuration for instructions on how to add covergeEndpoint to action.'
      );
    }

    let prData = await getData(authToken);

    if (url && authToken) {
      try {
        prData = await sendPullRequestData(url, prData);
      } catch (error) {
        console.log(`${error}, Could not send data`);
      }
    }

    const linesCoverage = {
      coverage: `${prData.coverage.lines.percent.toFixed(2)}%`,
      coverageAfterPR:
        prData.coverage.lines.diff === 0 || prData.coverage.lines.diff
          ? `${getCoverageAfterPr(
              prData.coverage.lines.percent,
              prData.coverage.lines.diff
            )}${getCoverageDifferenceEmoji(prData.coverage.lines.diff)}`
          : `${getCoverageEmoji(prData.coverage.lines.percent)}`,
    };

    const functionsCoverage = {
      coverage: `${prData.coverage.functions.percent.toFixed(2)}%`,
      coverageAfterPR:
        prData.coverage.lines.diff === 0 || prData.coverage.lines.diff
          ? `${getCoverageAfterPr(
              prData.coverage.functions.percent,
              prData.coverage.functions.diff
            )}${getCoverageDifferenceEmoji(prData.coverage.functions.diff)}`
          : `${getCoverageEmoji(prData.coverage.functions.percent)}`,
    };

    const branchesCoverage = {
      coverage: `${prData.coverage.branches.percent.toFixed(2)}%`,
      coverageAfterPR:
        prData.coverage.lines.diff === 0 || prData.coverage.lines.diff
          ? `${getCoverageAfterPr(
              prData.coverage.branches.percent,
              prData.coverage.branches.diff
            )}${getCoverageDifferenceEmoji(prData.coverage.branches.diff)}`
          : `${getCoverageEmoji(prData.coverage.branches.percent)}`,
    };

    if (actionDebug === 'true') {
      console.log(`Repo ID: ${prData.repositoryId}`);
      console.log(`Ref of branch being merged: ${prData.ref}`);
      console.log(`Ref of branch being merged into: ${prData.baseRef}`);
      console.log(`SHA of merge commit: ${prData.sha}`);
      console.log(`PR creator: ${prData.actor}`);
      console.log(`Time PR created: ${prData.timestamp}`);
      console.log(`Lines percent: ${prData.coverage.lines.percent}`);
      console.log(`Functions percent: ${prData.coverage.functions.percent}`);
      console.log(`Branches percent: ${prData.coverage.branches.percent}`);

      if (prData.coverage.lines.diff || prData.coverage.lines.diff === 0) {
        console.log(`Lines difference: ${prData.coverage.lines.diff}`);
      }

      if (prData.coverage.functions.diff || prData.coverage.functions.diff === 0) {
        console.log(`Functions difference: ${prData.coverage.functions.diff}`);
      }

      if (prData.coverage.branches.diff || prData.coverage.branches.diff === 0) {
        console.log(`Branches Difference: ${prData.coverage.branches.diff}`);
      }

      if (prData.pullRequest) {
        console.log(`Pull Request Number: ${prData.pullRequest}`);
      }
    }

    if (prData.message) {
      console.log(`Message: ${prData.message}`);

      console.table([linesCoverage, functionsCoverage, branchesCoverage]);
    } else if (prData.coverage.lines.diff === 0 || prData.coverage.lines.diff) {
      console.table([linesCoverage, functionsCoverage, branchesCoverage]);
    } else {
      console.table([linesCoverage, functionsCoverage, branchesCoverage]);
    }

    if (context.payload.pull_request) {
      makePullRequestComment(prData.message, prData.coverage);
    }
  } catch (error) {
    setFailed(`Coverage action failed to run: ${error.message}`);
  }
};

run();
