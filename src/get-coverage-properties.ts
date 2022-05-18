import { getInput } from '@actions/core';
import fs from 'fs';
import yaml from 'js-yaml';

export interface PathProperties {
  path: string;
  displayName: string;
}

interface CoverageConfig {
  coverage: PathProperties[];
}

const getConfiguration = async (): Promise<PathProperties[]> => {
  try {
    const configuration: CoverageConfig = yaml.load(fs.readFileSync('coverage.yml', 'utf8')) as CoverageConfig;

    return configuration.coverage;
  } catch {
    const coverageData = getInput('coverageData');

    const coverageProperties: PathProperties = { path: coverageData, displayName: coverageData };

    return [coverageProperties];
  }
};

export default getConfiguration;
