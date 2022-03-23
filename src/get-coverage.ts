import * as lcov from 'lcov-parse';
import { promisify } from 'util';


import handleCoverage from './handle-coverage';

import { CommentData } from './types';

const lcovParse = promisify(lcov);

const getCoverage = async (path: string): Promise<CommentData> => {

  try {

    const commentData = handleCoverage(path)

    return commentData;
  } catch {
    throw new Error(
      'Failed to parse coverage file from path specified by `coverageData` (default path: coverage/lcov.info). See configuration for instructions on how to upload coverage.'
    );
  }
};

export default getCoverage;
