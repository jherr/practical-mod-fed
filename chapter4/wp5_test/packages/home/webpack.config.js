const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "home",
      library: { type: "var", name: "home" },
      filename: "remoteEntry.js",
      remotes: {
        nav: {
          external: "http://localhost:3001/remoteEntry.js",
        },
      },
      exposes: {},
      shared: ["react"],
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
