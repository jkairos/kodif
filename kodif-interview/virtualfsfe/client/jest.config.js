module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.jsx?$': 'babel-jest',  // Transform JavaScript files with babel-jest
        '^.+\\.js$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!axios)',  // Transform ES Modules in node_modules like axios
    ],
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy',
        '^axios$': 'axios/dist/node/axios.cjs',
    },
};
