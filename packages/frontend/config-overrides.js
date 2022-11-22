// eslint-disable-next-line import/no-extraneous-dependencies
const { override, addWebpackExternals } = require("customize-cra");

// https://github.com/arackaf/customize-cra/issues/44
function addEnvVariablesToDefinePlugin(config) {
    const definePlugin = config.plugins.find((plugin) => plugin.constructor.name === "DefinePlugin");
    if (definePlugin === undefined) {
        throw new Error("Cannot define environment variables");
    }

    const existingProcessEnvironment = definePlugin.definitions["process.env"] ?? {};
    definePlugin.definitions["process.env"] = {
        ...existingProcessEnvironment,
        ORIGIN: JSON.stringify(process.env.ORIGIN),
        PORT: JSON.stringify(process.env.PORT),
    };

    return config;
}

const noop = (config) => config;

module.exports = override(
    addEnvVariablesToDefinePlugin,
    ...(process.env.NODE_ENV === "production"
        ? [
              addWebpackExternals({
                  react: "React",
                  "react-dom": "ReactDOM",
              }),
          ]
        : [noop]),
);
