export type CoverageInfo = {
  hit: number;
  found: number;
  percent: number;
  diff: number;
};

export type CommentData = {
  lines: CoverageInfo;
  functions: CoverageInfo;
  branches: CoverageInfo;
};

export type PRData = {
  repositoryId: number;
  pathName: string;
  ref: string;
  baseRef: string;
  sha: string;
  actor: string;
  timestamp: string;
  coverage: CommentData;
  token: string;
  pullRequest?: number;
  message?: string;
};

export type CoverageJson = {
  id: number;
  ref: string;
  baseRef: string;
  pathName: string;
  hash: string;
  actor: string;
  linesHit: number;
  linesFound: number;
  functionsHit: number;
  functionsFound: number;
  branchesHit: number;
  branchesFound: number;
  token: string;
  pullRequest?: number;
};
