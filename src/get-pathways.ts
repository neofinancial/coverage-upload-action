
import * as fs  from 'fs';
import * as yaml from 'js-yaml'

export interface PathwayProperties {
  name:string
  displayName: string
}

interface CoverageConfig {
  coverage: PathwayProperties []
}

const getPathways = async (): Promise<PathwayProperties[]> => {

  try {
    const configuration: CoverageConfig  | any = yaml.load(fs.readFileSync('coverage.yml', 'utf8'));

    return configuration.coverage

  } catch (error) {
    console.log(`Error: ${error.message}`);
  }

  return [];
};

export default getPathways;
