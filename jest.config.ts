export default {
  clearMocks: true,
  collectCoverage: true,
  runner: "groups",
  testEnvironment: 'node',
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1'
  },
  coverageReporters: [
    "json-summary",
    "text",
    "lcov"
  ]
};