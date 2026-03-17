const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // 웹팩이 빌드할 파일을 알려주는 역할
  entry: "./src/index.js",
  // 웹팩에서 빌드를 완료하면 output에 명시되어 있는 정보를 통해 빌드 파일을 생성
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname + "/build"),
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "/build"),
    },
    port: 9000,
    // open: true 추가 (브라우저 자동 실행)
    open: true,
  },
  // 웹팩 빌드 옵션으로 production은 최적화되어 빌드되어지는 특징을 가지고 있고 development는 빠르게 빌드하는 특징, none 같은 경우는 아무 기능 없이 웹팩으로 빌드
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules",
        use: ["babel-loader"],
      },
      {
        test: /\.html$/,
        use: [
          {
            // 로더는 html 파일을 읽었을 때 html-loader를 실행하여 웹팩이 이해할 수 있게 하고 options 으로는 minimize(줄바꿈 없음)라는 코드 최적화 옵션을 사용
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      // use에 있는 loader 순서는 오른쪽에서 왼쪽 순서로 실행이 됩니다. css-loader로 css 파일을 읽고 MniCssExtractPlugin.loader로 읽은 CSS를 파일로 추출해 냅니다.
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    // html-webpack-plugin은 웹팩이 html 파일을 읽어서 html 파일을 빌드
    new HtmlWebPackPlugin({
      template: "./public/index.html", // public/index.html 파일을 읽는다.
      filename: "index.html", // output으로 출력할 파일은 index.html 이다.
    }),
    // DefinePlugin으로 process.env.NODE_ENV 정의
    // Webpack 5에서는 Node.js polyfill을 자동으로 제공하지 않으므로 DefinePlugin으로 환경 변수를 정의
    // 실제 사용하는 환경 변수만 번들에 포함
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development",
      ),
    }),
    new MiniCssExtractPlugin({
      filename: "style-test.css",
    }),
    new CleanWebpackPlugin(),
  ],
};
