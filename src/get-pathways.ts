

const getPathways = (coverageData: string | string[]): string[] => {
  if(typeof coverageData === 'string'){
    return [coverageData]
  }

  return coverageData

  //need to check if glob here
  //const paths = await globby(['*', '!cake']);
}


export default getPathways
