//import { globby } from "globby";


const getPathways = (coverageData: string | string[]): string[] => {
  if(typeof coverageData === 'string'){
    return [coverageData]
  }

  // //object is globby
  // if(){
  //   return await globby(coverageData);
  // }

  return coverageData

}


export default getPathways
