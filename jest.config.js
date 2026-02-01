module.exports = {
    testEnvironment: 'node',
    verbose: true,
    roots: ['<rootDir>'],
    moduleFileExtensions: ['js', 'json', 'node'],
    testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['**/*.js', '!**/node_modules/**', '!**/vendor/**'],
};
