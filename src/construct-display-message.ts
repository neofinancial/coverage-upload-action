import { PullRequestData } from './types';

interface displayMessageObject {
  name: string;
  coverage: string;
  difference: string;
}

const constructDisplayMessage = (prData: PullRequestData): displayMessageObject[] => {
  const linesCoverage = {
    name: 'Lines',
    coverage: `${prData.coverage.lines.percent.toFixed(2)}%`,
    difference: prData.message ? `${prData.message.split('\n')[4].split('|')[3]}`.trim() : 'No Data',
    '': prData.message ? `${prData.message.split('\n')[4].split('|')[4].trim()}` : 'No Data',
  };

  const functionsCoverage = {
    name: 'Functions',
    coverage: `${prData.coverage.functions.percent.toFixed(2)}%`,
    difference: prData.message ? `${prData.message.split('\n')[5].split('|')[3]}`.trim() : 'No Data',
    '': prData.message ? `${prData.message.split('\n')[5].split('|')[4].trim()}` : 'No Data',
  };

  const branchesCoverage = {
    name: 'Branches',
    coverage: `${prData.coverage.branches.percent.toFixed(2)}%`,
    difference: prData.message ? `${prData.message.split('\n')[6].split('|')[3]}`.trim() : 'No Data',
    '': prData.message ? `${prData.message.split('\n')[6].split('|')[4].trim()}` : 'No Data',
  };

  return [linesCoverage, functionsCoverage, branchesCoverage];
};

export default constructDisplayMessage;
