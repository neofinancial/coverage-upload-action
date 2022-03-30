import globby from 'globby';

const trimWhiteSpace = (paths: string): string => {
  return paths.replace(/\s/g, '');
};

const splitBySeparator = (paths: string, separator: string): string[] => {
  if (paths.includes(separator)) {
    return paths.split(separator);
  }

  return [paths];
};

const isGlobby = (paths: string): boolean => {
  return paths.includes('!') || paths.includes('*') || paths.includes('?');
};

const getPathways = async (coverageData: string): Promise<string[]> => {
  const pathwayString = trimWhiteSpace(coverageData);
  const pathwayArray = splitBySeparator(pathwayString, ',');

  if (isGlobby(pathwayString)) {
    console.log('isglobby');

    return globby(pathwayArray);
  }

  return pathwayArray;
};

export default getPathways;
