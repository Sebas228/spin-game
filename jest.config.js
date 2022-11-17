/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  transform: {
    '^.+\\.svelte$': ['svelte-jester', { preprocess: true }],
    '^.+\\.ts$': 'babel-jest',
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(svelte-icons-pack))',
    '<rootDir>/node_modules/(?!(dexie))',
  ],
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
};
