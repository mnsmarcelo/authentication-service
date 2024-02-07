module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleNameMapper: {
    'tests/(.*)': '<rootDir>/tests/$1',
    'src/(.*)': '<rootDir>/src/$1',
  },
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
}