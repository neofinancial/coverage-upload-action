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

export type PullRequestData = {
  repositoryId: number;
  ref: string;
  baseRef: string;
  sha: string;
  actor: string;
  timestamp: string;
  coverage: CommentData;
  token?: string;
  pullRequest?: number;
  message?: string;
  repoName?: string;
};

export type CoverageJson = {
  id: number;
  ref: string;
  baseRef: string;
  hash: string;
  actor: string;
  linesHit: number;
  linesFound: number;
  functionsHit: number;
  functionsFound: number;
  branchesHit: number;
  branchesFound: number;
  token?: string;
  pullRequest?: number;
  repoName: string;
};
