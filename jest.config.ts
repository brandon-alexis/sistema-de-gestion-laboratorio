export default {
  testEnvironment: 'node',

  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
          },
          target: 'es2022',
        },
        module: {
          type: 'nodenext',
        },
      },
    ],
  },

  moduleNameMapper: {
    '^@src/(.*)\\.js$': '<rootDir>/src/$1',
    '^@shared/(.*)\\.js$': '<rootDir>/src/shared/$1',
    '^@config/(.*)\\.js$': '<rootDir>/src/shared/config/$1',
    '^@students/(.*)\\.js$': '<rootDir>/src/app/students/$1',
    '^@professors/(.*)\\.js$': '<rootDir>/src/app/professors/$1',
    '^@items/(.*)\\.js$': '<rootDir>/src/app/items/$1',
    '^@itemCategories/(.*)\\.js$': '<rootDir>/src/app/itemCategories/$1',
    '^@itemTypes/(.*)\\.js$': '<rootDir>/src/app/itemTypes/$1',
  },

  testPathIgnorePatterns: ['/dist/', '/node_modules/'],
  moduleFileExtensions: ['ts', 'js', 'json'],
};
