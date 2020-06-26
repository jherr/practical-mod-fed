const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Datastore = require("nedb");

const db = new Datastore({ filename: "pages.db" });
db.loadDatabase();

module.exports = {
  output: {
    publicPath: "http://localhost:8080/",
  },

  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },

  devServer: {
    before: function (app) {
      const bodyParser = require("body-parser");
      app.use(bodyParser.json());
      app.use(require("cors")());

      app.post("/api/:page", function (req, res) {
        const page = req.params.page;
        db.find({ _id: page }, (err, docs) => {
          if (!err && docs.length > 0) {
            db.update({ _id: page }, { $set: req.body }, {}, () => {
              res.json({ record: "updated" });
            });
          } else {
            db.insert(
              {
                _id: page,
                ...req.body,
              },
              () => {
                res.json({ record: "inserted" });
              }
            );
          }
        });
      });

      app.get("/api/:page", function (req, res) {
        const page = req.params.page;
        db.find({ _id: page }, (err, docs) => {
          if (!err) {
            res.json(docs[0] || {});
          } else {
            res.json({ error: `error getting ${page}` });
          }
        });
      });
    },
    historyApiFallback: true,
    port: 8080,
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
      {
        test: /\.(png|svg|jpg|gif|woff|ttf|woff2|eot)$/,
        use: ["file-loader"],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "cms",
      library: { type: "var", name: "cms" },
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./EmbedPage": "./src/EmbedPage",
        "./EmbedEditor": "./src/EmbedEditor",
      },
      shared: require("./package.json").dependencies,
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
