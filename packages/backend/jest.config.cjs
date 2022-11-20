module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "@sample/(.+)": "<rootDir>../$1/src",
    },
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
