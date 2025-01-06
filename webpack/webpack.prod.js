const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  // Set mode to production for optimized build
  mode: "production",

  // Generate full source maps for debugging
  devtool: false,

  // Optimization settings for production
  optimization: {
    splitChunks: {
      chunks: "all", // Split code into separate chunks for better caching
    },
  },
});
