module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['__tests__/unit', '__tests__/utils'],
  globalSetup: './__tests__/utils/setup.js',
  globalTeardown: './__tests__/utils/teardown.js'
};
