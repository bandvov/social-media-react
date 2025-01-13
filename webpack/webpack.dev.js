const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const fs = require("fs");
const { LoaderOptionsPlugin, HotModuleReplacementPlugin } = require("webpack");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const path = require("path");

module.exports = merge(common, {
  // Set mode to development for unoptimized build
  mode: "development",

  // Enable source maps for easier debugging
  devtool: "inline-source-map",

  // Development server configuration
  devServer: {
    static: {
      directory: "./dist", // Serve files from the "dist" directory
    },
    https: {
      key: fs.readFileSync("./certs/key.pem"),
      cert: fs.readFileSync("./certs/cert.pem"),
    }, // Enable HTTPS for secure communication
    open: true, // Automatically open the browser
    port: 3000, // Port to run the development server
    historyApiFallback: true, // Redirect 404s to index.html for React Router
  },
  plugins: [
    new LoaderOptionsPlugin({
      // test: /\.xxx$/, // may apply this only for some modules
      options: {
        client: {
          // Shows a full-screen overlay in the browser when there are compiler errors or warnings
          overlay: {
            errors: true,
            warnings: true,
          },
          progress: true, // Prints compilation progress in percentage in the browser.
        },
      },
    }),
    new ESLintWebpackPlugin({
      files: "src/**/*.(js|jsx|ts|tsx)",
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      overrideConfigFile: path.resolve(__dirname, "../eslintrc.json"),
      lintDirtyModulesOnly: true,
      fix: true,
      emitError: true,
      emitWarning: true,
      failOnError: false,
      failOnWarning: false,
    }),
    new ErrorOverlayPlugin(),
    new HotModuleReplacementPlugin({}),
  ],
});
