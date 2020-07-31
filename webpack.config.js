const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "production",
  output: {
    filename: "table.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [
            "style-loader",
            "css-loader"
        ],
      },
    ],
  },
};
