import globby from 'globby';

const getPathways = async (coverageData: string): Promise<string[]> => {

  if (coverageData.includes(',')) {
    coverageData.split(',');
  }

  console.log('coverageData',coverageData)

  const paths = await globby(coverageData);

  return paths

};

export default getPathways;
