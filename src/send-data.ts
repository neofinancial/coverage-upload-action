import axios from 'axios';

import { CommentData, CoverageJson, PRData } from './types';

const sendData = async (url: string, prData: PRData): Promise<CommentData> => {
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

    prData.coverage.lines.diff = response.data.linesDifference;
    prData.coverage.functions.diff = response.data.functionsDifference;
    prData.coverage.branches.diff = response.data.branchesDifference;

    return prData.coverage;
  } catch (error) {
    //TO DO: this will be different once upload action accepts a comment
    throw new Error('Failed to retrieve coverage from endpoint.');
  }
};

export default sendData;
