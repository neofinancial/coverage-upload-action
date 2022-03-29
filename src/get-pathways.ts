import globby from 'globby';

const getPathways = async (coverageData: string): Promise<string[]> => {

  if (coverageData.includes(',')) {
    const separated = coverageData.split(',')

    return separated
  }

  const paths = await globby(coverageData);

  return paths

};

export default getPathways;
