const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const fs = require("fs");

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
});
