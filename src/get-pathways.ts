import globby from 'globby';

const getPathways = async (coverageData: string): Promise<string[]> => {
  if (coverageData.includes(',')) {
    const separated = coverageData.split(',');

    const paths = await globby(separated);

    return paths
  }

  return [coverageData];
};

export default getPathways;
