module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "testMatch": [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    "moduleNameMapper": {
        "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/__mocks__/fileMock.js",
        "\\.(css|scss)$": "<rootDir>/src/__mocks__/styleMock.js",
    },
    "testEnvironment": "jest-environment-jsdom",
    "setupFilesAfterEnv": ['@testing-library/jest-dom/extend-expect'],
    "resetMocks": true,
}