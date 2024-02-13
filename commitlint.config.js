const automaticCommitPattern = /^release\(version\):.*\[skip ci]/;

module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [(commitMsg) => automaticCommitPattern.test(commitMsg)],
};
