import lcov from 'lcov-parse';
import { promisify } from 'util';

import { CommentData } from './types';

const lcovParse = promisify(lcov);

const getCoverage = async (path: string): Promise<CommentData> => {
  try {
    const coverageData = await lcovParse(path);

    const commentData = {
      lines: { hit: 0, found: 0, percent: 0, diff: 0 },
      functions: { hit: 0, found: 0, percent: 0, diff: 0 },
      branches: { hit: 0, found: 0, percent: 0, diff: 0 },
    };

    for (const i in coverageData) {
      commentData.lines.hit += coverageData[i].lines.hit;
      commentData.lines.found += coverageData[i].lines.found;
      commentData.functions.hit += coverageData[i].functions.hit;
      commentData.functions.found += coverageData[i].functions.found;
      commentData.branches.hit += coverageData[i].branches.hit;
      commentData.branches.found += coverageData[i].branches.found;
    }

    commentData.lines.percent = (commentData.lines.hit / commentData.lines.found) * 100;
    commentData.functions.percent = (commentData.functions.hit / commentData.functions.found) * 100;
    commentData.branches.percent = (commentData.branches.hit / commentData.branches.found) * 100;

    return commentData;
  } catch {
    throw new Error(
      'Failed to parse coverage file(s) from path(s) specified by `coverage.yml` or `coverageData`. See configuration for instructions on how to upload coverage.'
    );
  }
};

export default getCoverage;
