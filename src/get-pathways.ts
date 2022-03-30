import globby from 'globby';

const trimWhiteSpace = (paths: string): string => {
  return paths.replace(/\s/g, "")
}

const splitBySeparator = (paths: string):string[] => {
  return paths.split(',')
}

const getPathways = async (coverageData: string): Promise<string[]> => {

  const pathwayString = trimWhiteSpace(coverageData)

  let pathwayArray

  if (pathwayString.includes(',')) {
    pathwayArray = splitBySeparator(pathwayString)
  }

  pathwayArray = await globby(pathwayString);

  console.log('PATHWAY ARRAY')

  return pathwayArray

};



export default getPathways;
