
import * as fs  from 'fs';
import * as yaml from 'js-yaml'

interface Pathway {
  coverage: Record<string,string>[]
}

const getPathways = async (): Promise<string[]> => {

  try {
    const configuration: Pathway | unknown = yaml.load(fs.readFileSync('coverage.yml', 'utf8'));

    console.log("YAML",configuration);

    configuration.coverage.map((coverage) =>{
      return coverage
    })

  } catch (error) {
    console.log(`Error: ${error.message}`);
  }

  return [];
};

export default getPathways;
