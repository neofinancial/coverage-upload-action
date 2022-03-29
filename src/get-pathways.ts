import globby from 'globby';

const getPathways = async (coverageData: string): Promise<string[]> => {

  if (coverageData.includes(',')) {
    const separated = coverageData.split(',')

    console.log("split",separated)

    const paths = await globby(separated);

    return paths
  }

  console.log('coverageData',coverageData)

  const paths = await globby(coverageData);

  return paths

};

export default getPathways;
