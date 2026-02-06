// jest.config.js



module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },

  transformIgnorePatterns: [
    '/node_modules/(?!(some-esm-package-name)/)',
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg|webp)$': '<rootDir>/__mocks__/fileMock.js',
  },

  moduleDirectories: ['node_modules', '<rootDir>', '<rootDir>/src'],
};
