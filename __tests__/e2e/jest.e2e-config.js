/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  testRegex: '/e2e/.*\\.test\\.ts$',
  notify: true,
};
