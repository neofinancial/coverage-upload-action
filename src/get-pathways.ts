import { getInput } from '@actions/core';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

export interface PathwayProperties {
  path: string;
  displayName: string;
}

interface CoverageConfig {
  coverage: PathwayProperties[];
}

const getConfiguration = async (): Promise<PathwayProperties[]> => {
  try {
    const configuration: CoverageConfig = yaml.load(fs.readFileSync('coverage.yml', 'utf8')) as CoverageConfig;

    return configuration.coverage;
  } catch {
    const coverageData = getInput('coverageData');

    const coverageProperties: PathwayProperties = { path: coverageData, displayName: coverageData };

    return [coverageProperties];
  }
};

export default getConfiguration;
