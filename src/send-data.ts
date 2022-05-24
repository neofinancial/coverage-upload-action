import axios from 'axios';

import { CoverageJson, PullRequestData } from './types';

const sendPullRequestData = async (url: string, prData: PullRequestData): Promise<PullRequestData> => {
  const postData: CoverageJson = {
    id: prData.repositoryId,
    ref: prData.ref,
    baseRef: prData.baseRef,
    hash: prData.sha,
    actor: prData.actor,
    linesHit: prData.coverage.lines.hit,
    linesFound: prData.coverage.lines.found,
    functionsHit: prData.coverage.functions.hit,
    functionsFound: prData.coverage.functions.found,
    branchesHit: prData.coverage.branches.hit,
    branchesFound: prData.coverage.branches.found,
    token: prData.token,
  };

  if (prData.pullRequest) {
    postData.pullRequest = prData.pullRequest;
  }

  try {
    const response = await axios.post(url, postData);
    console.log('----------------RESPONSE--------------');
    console.log(response);

    if (response.data.type === 'difference') {
      prData.coverage.lines.diff = response.data.data.linesDifference;
      prData.coverage.functions.diff = response.data.data.functionsDifference;
      prData.coverage.branches.diff = response.data.data.branchesDifference;
    } else if (response.data.type === 'comment') {
      prData.message = response.data.data.comment;
    }

    return prData;
  } catch (error) {
    throw new Error(error);
  }
};

export default sendPullRequestData;
