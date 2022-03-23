import axios from 'axios';

import { CoverageJson, PRData } from './types';

const sendDataComment = async (url: string, prData: PRData): Promise<string> => {

  const postData: CoverageJson = {
    id: prData.repositoryId,
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
    const response = await axios.post(url, postData, {
      headers: { responseType: 'comment' },
    });

    return response.data.message;
  } catch (error) {
    throw new Error(error);
  }
};

export default sendDataComment;
