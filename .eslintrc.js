module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json", "./packages/*/tsconfig.json"],
        extraFileExtensions: [".cjs"],
    },

    plugins: ["jest", "import", "react-hooks"],

    extends: [],

    rules: {},

    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
            },
        },
        jest: {
            version: "^26.6.0",
        },
    },
};
