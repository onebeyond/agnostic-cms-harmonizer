/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  testRegex: '__tests__/e2e/.*\\.test\\.ts$',
  notify: true,
};
