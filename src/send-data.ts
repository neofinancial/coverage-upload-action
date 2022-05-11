import axios from 'axios';

import { CoverageJson, PRData } from './types';

const sendData = async (url: string, prData: PRData): Promise<PRData> => {
  const postData: CoverageJson = {
    id: prData.repositoryId,
    baseRef: prData.baseRef,
    pathName: prData.pathName,
    ref: prData.ref,
    hash: prData.sha,
    actor: prData.actor,
    linesHit: prData.coverage.lines.hit,
    linesFound: prData.coverage.lines.found,
    functionsHit: prData.coverage.functions.hit,
    functionsFound: prData.coverage.functions.found,
    branchesHit: prData.coverage.branches.hit,
    branchesFound: prData.coverage.branches.found,
    token: prData.token,
    displayName: prData.displayName,
  };

  if (prData.pullRequest) {
    postData.pullRequest = prData.pullRequest;
  }

  try {
    const response = await axios.post(url, postData);

    if (response.headers.responsetype === 'difference') {
      prData.coverage.lines.diff = response.data.linesDifference;
      prData.coverage.functions.diff = response.data.functionsDifference;
      prData.coverage.branches.diff = response.data.branchesDifference;
    } else if (response.headers.responsetype === 'comment') {
      prData.message = response.data.comment;
    }

    return prData;
  } catch (error) {
    throw new Error(error);
  }
};

export default sendData;
