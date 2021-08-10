const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

// module.exports = {
//   // entry: "./src/webpack-index.js",
//   entry: "./src/index.js",
//   mode: "production",
//   output: {
//     filename: "table.js",
//     path: path.resolve(__dirname, "dist"),
//     // libraryTarget: "commonjs2",
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /(node_modules)/,
//         use: "babel-loader",
//       },
//       {
//         test: /\.css$/i,
//         use: ["style-loader", "css-loader"],
//       },
//     ],
//   },
//   optimization: {
//     minimize: true,
//     minimizer: [
//       new TerserPlugin({
//         parallel: true,
//         cache: true,
//         terserOptions: {
//           output: {
//             comments: false,
//           },
//         },
//       }),
//     ],
//   },
// };

var config = {
  entry: "./src/webpack-index.js",
  mode: "production",
  output: {
    filename: "table.js",
    path: path.resolve(__dirname, "dist"),
    // libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: "babel-loader"
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  }
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.entry = "./src/index.js";
    config.mode = "development";
    config.output.path = path.resolve(__dirname, "public");
  }
  // if (argv.mode === 'production') {

  // }

  return config;
};
