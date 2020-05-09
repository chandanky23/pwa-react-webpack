const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const webpackMerge = require("webpack-merge")
// const loadPresets = require("./webpackPresets")

const modeConfig = (env) => require(`./webpack.${env.mode}.js`)(env)

module.exports = ({ mode }) => {
  return webpackMerge(
    {
      mode,
      entry: path.resolve(__dirname, "./src/app/index.jsx"),
      output: {
        filename: "bundle.js",
        publicPath: "/",
        path: path.resolve(__dirname, "build"),
      },
      resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
      },
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: "./src/app/index.html",
          filename: "index.html",
        }),
        new CopyWebpackPlugin(
          [
            {
              from: "src/app/assets",
              to: "assets/",
            },
            {
              from: "src/sw.js",
              to: "sw.js",
            },
          ],
          { ignore: [".DS_Store"] }
        ),
      ],
    },
    modeConfig({ mode })
    // loadPresets({ mode, presets })
  )
}
