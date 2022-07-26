import { PullRequestData } from './types';

interface displayMessageObject {
  name: string;
  coverage: string;
  differenceAfterPR: string;
}

const constructDisplayMessage = (prData: PullRequestData): displayMessageObject[] => {
  const linesCoverage = {
    name: 'Lines',
    coverage: `${prData.coverage.lines.percent.toFixed(2)}%`,
    differenceAfterPR: prData.message
      ? `${prData.message.split('\n')[4].split('|')[3].trim()} ${prData.message.split('\n')[4].split('|')[0].trim()} `
      : 'No Data',
    test: prData.message ? `${prData.message.split('\n')[4].split('|')[4].trim()}` : 'No Data',
  };

  const functionsCoverage = {
    name: 'Functions',
    coverage: `${prData.coverage.functions.percent.toFixed(2)}%`,
    differenceAfterPR: prData.message
      ? `${prData.message.split('\n')[5].split('|')[3].trim()} ${prData.message.split('\n')[5].split('|')[0].trim()} `
      : 'No Data',
    test: prData.message ? `${prData.message.split('\n')[5].split('|')[4].trim()}` : 'No Data',
  };

  const branchesCoverage = {
    name: 'Branches',
    coverage: `${prData.coverage.branches.percent.toFixed(2)}%`,
    differenceAfterPR: prData.message
      ? `${prData.message.split('\n')[6].split('|')[3].trim()} ${prData.message.split('\n')[6].split('|')[0].trim()} `
      : 'No Data',
    test: prData.message ? `${prData.message.split('\n')[6].split('|')[4].trim()}` : 'No Data',
  };

  console.log(branchesCoverage.differenceAfterPR.trimEnd());
  console.log(branchesCoverage.differenceAfterPR);

  return [linesCoverage, functionsCoverage, branchesCoverage];
};

export default constructDisplayMessage;
