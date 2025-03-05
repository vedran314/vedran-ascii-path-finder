module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@/lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@/validators/(.*)$": "<rootDir>/src/validators/$1",
  },
};
