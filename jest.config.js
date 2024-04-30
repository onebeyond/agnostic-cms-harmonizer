/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  testRegex: ['/src/.*\\.test\\.ts$', '/__tests__/e2e/import-library/.*\\.test\\.ts$'],
};
