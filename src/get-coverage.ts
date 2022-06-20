import lcov from 'lcov-parse';
import { promisify } from 'util';

import { CommentData, PullRequestData } from './types';

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

const getMonoRepoCoverage = async (monoRepoData: PullRequestData[]): Promise<CommentData> => {
  try {
    // eslint-disable-next-line unicorn/no-reduce
    const { linesData, functionsData, branchesData } = monoRepoData.reduce(
      (initial, current) => {
        return {
          linesData: {
            hit: initial.linesData.hit + current.coverage.lines.hit,
            found: initial.linesData.found + current.coverage.lines.found,
          },
          functionsData: {
            hit: initial.functionsData.hit + current.coverage.functions.hit,
            found: initial.functionsData.found + current.coverage.functions.found,
          },
          branchesData: {
            hit: initial.branchesData.hit + current.coverage.branches.hit,
            found: initial.branchesData.found + current.coverage.branches.found,
          },
        };
      },
      { linesData: { hit: 0, found: 0 }, functionsData: { hit: 0, found: 0 }, branchesData: { hit: 0, found: 0 } }
    );

    return {
      lines: { hit: linesData.hit, found: linesData.found, percent: (linesData.hit / linesData.found) * 100, diff: 0 },
      functions: {
        hit: functionsData.hit,
        found: functionsData.found,
        percent: (functionsData.hit / functionsData.found) * 100,
        diff: 0,
      },
      branches: {
        hit: branchesData.hit,
        found: branchesData.found,
        percent: (branchesData.hit / branchesData.found) * 100,
        diff: 0,
      },
    };
  } catch {
    throw new Error(
      'Failed to parse coverage file(s) from path(s) specified by `coverage.yml` or `coverageData`. See configuration for instructions on how to upload coverage.'
    );
  }
};

export { getCoverage, getMonoRepoCoverage };
