import { globby } from "globby"

const getPathways = async (coverageData: string): Promise<string[]> => {

  if (coverageData.includes(',')){
    const separated = coverageData.split(',')

    console.log('separated string', separated)

    const globbied = await globby(separated)

    console.log('globbied',globbied)

    return globbied

  }


  return [coverageData]

}


export default getPathways
