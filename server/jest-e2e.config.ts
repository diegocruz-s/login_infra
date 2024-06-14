import jestConfig from './jest.config';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.testing' });

export default {
  ...jestConfig,
  testEnvironment: './src/tests/MongodbE2E.ts',
  testRegex: '.e2e-spec.ts$|.repo-spec.ts$',
  maxWorkers: 1,
};