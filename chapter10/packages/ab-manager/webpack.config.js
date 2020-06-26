const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: "http://localhost:8081/",
  },

  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8081,
  },

  module: {
    rules: [
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
      name: "ab_mgr",
      library: { type: "var", name: "ab_mgr" },
      filename: "remoteEntry.js",
      remotes: {
        "ab-manager": "ab_mgr",
      },
      exposes: {
        "./VariantChooser": "./src/VariantChooser",
        "./variants": "./src/variants",
      },
      shared: require("./package.json").dependencies,
    }),
  ],
};
