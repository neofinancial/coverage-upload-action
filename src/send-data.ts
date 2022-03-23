import axios from 'axios';

import { CommentData, CoverageJson, PRData } from './types';

const sendData = async (url: string, prData: PRData): Promise<CommentData | string> => {
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

    if(response.headers.responseType === 'difference'){
      prData.coverage.lines.diff = response.data.linesDifference;
      prData.coverage.functions.diff = response.data.functionsDifference;
      prData.coverage.branches.diff = response.data.branchesDifference;


      return prData.coverage
    } else if(response.headers.responseType === 'comment'){

      return response.data.comment
    }

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export default sendData;
