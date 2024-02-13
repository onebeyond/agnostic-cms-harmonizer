/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  testRegex: '/cms/.*\\.test\\.ts$',
  notify: true,
};
