const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  // Entry point of the application
  entry: path.resolve(__dirname, "../src/index.js"),

  // Output configuration for bundled files
  output: {
    path: path.resolve(__dirname, "../dist"), // Directory for output files
    filename: "[name].[contenthash].js", // File name with content hash for caching
    clean: true, // Clean the output directory before each build
  },

  // File extensions to resolve without specifying in imports
  resolve: {
    extensions: [".js", ".jsx"],
  },

  // Module rules for transforming files
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Match JavaScript and JSX files
        exclude: /node_modules/, // Exclude files in node_modules
        use: "babel-loader", // Use Babel for transpiling
      },
      {
        test: /\.css$/, // Match CSS files
        use: ["style-loader", "css-loader"], // Use loaders for injecting and parsing CSS
      },
    ],
  },

  // Plugins to extend Webpack functionality
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"), // Template for the HTML file
      favicon: path.resolve(__dirname, "../public/favicon.ico"), // Add favicon
    }),
    new Dotenv(), // Load environment variables from .env file
  ],
};
