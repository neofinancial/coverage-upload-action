
import * as fs  from 'fs';
import * as yaml from 'js-yaml'

interface Pathway {
  coverage: Record<string,string>[]
}

const getPathways = async (): Promise<Record<string,string>[]> => {

  try {
    const configuration: Pathway | any = yaml.load(fs.readFileSync('coverage.yml', 'utf8'));

    return configuration.coverage

  } catch (error) {
    console.log(`Error: ${error.message}`);
  }

  return [];
};

export default getPathways;
