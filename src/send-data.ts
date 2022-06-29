import axios from 'axios';

import { CoverageJson, PullRequestData } from './types';

const sendPullRequestData = async (url: string, prData: PullRequestData[]): Promise<PullRequestData> => {
  const postData: CoverageJson[] = [];

  for (const pr of prData) {
    postData.push({
      id: pr.repositoryId,
      baseRef: pr.baseRef,
      path: pr.path,
      ref: pr.ref,
      hash: pr.sha,
      actor: pr.actor,
      linesHit: pr.coverage.lines.hit,
      linesFound: pr.coverage.lines.found,
      functionsHit: pr.coverage.functions.hit,
      functionsFound: pr.coverage.functions.found,
      branchesHit: pr.coverage.branches.hit,
      branchesFound: pr.coverage.branches.found,
      token: pr.token,
      displayName: pr.displayName,
      pullRequest: pr.pullRequest,
    });
  }

  try {
    const { data: responseData } = await axios.post(url, postData);

    const receivedPrData: PullRequestData = {
      repositoryId: prData[0].repositoryId,
      path: prData[0].path,
      ref: prData[0].ref,
      baseRef: prData[0].baseRef,
      sha: prData[0].sha,
      actor: prData[0].actor,
      timestamp: prData[0].timestamp,
      coverage: prData[0].coverage,
      token: prData[0].token,
      pullRequest: prData[0].pullRequest,
      message: responseData.type === 'comment' ? responseData.data.comment : undefined,
      displayName: prData[0].displayName,
    };

    if (responseData.type === 'difference') {
      receivedPrData.coverage.lines.diff = responseData.data.linesDifference;
      receivedPrData.coverage.functions.diff = responseData.data.functionsDifference;
      receivedPrData.coverage.branches.diff = responseData.data.branchesDifference;
    }

    return receivedPrData;
  } catch (error) {
    console.error(`Could not send PR data: ${error.message},`);
  }

  return prData[0];
};

export default sendPullRequestData;
