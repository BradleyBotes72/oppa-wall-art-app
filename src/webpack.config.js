// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/", // Required for React Router
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Transpile both .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/, // Handle CSS files
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Handle image files
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    fallback: {
      // Provide polyfills for Node.js core modules if needed
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
      crypto: require.resolve("crypto-browserify"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Use the index.html from public
    }),
    new NodePolyfillPlugin(),
    new Dotenv(), // Loads variables from .env into process.env
  ],
  devServer: {
    historyApiFallback: true, // For React Router
    port: 3000,
    open: true,
  },
};
