"use strict";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

//公共模块
const configFactory = require("./webpack.common");
const { merge } = require("webpack-merge");
//压缩js
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
//压缩style
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//压缩css
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

const prodWebpackConfig = merge(new configFactory("production"), {
  mode: "production",
  //压缩打包，不准确映射调试，
  devtool: "source-map",
  //代码分割
  optimization: {
    splitChunks: {
      // chunks: "all", //可以不用，下面又了
      // 重复打包问题
      cacheGroups: {
        vendors: {
          // node_modules里的代码
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          // name: 'vendors', 一定不要定义固定的name
          priority: 10, // 优先级
          enforce: true,
        },
      },
    },
  },
  //外部扩展，需要在html中引入cdn
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  plugins: [
    //压缩打包,sourceMap为true打包出的js中额外有js.map可以映射调试所在行,false的时候关闭
    new UglifyJSPlugin({
      sourceMap: false,
      uglifyOptions: {
        compress: {
          // 删除所有的 `console` 语句，可以兼容ie浏览器
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true,
        },
        output: {
          // 最紧凑的输出
          beautify: false,
          // 删除所有的注释
          comments: false,
        },
      },
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin(),
    //style压缩
    new MiniCssExtractPlugin({ filename: "css/[name].css" }),
  ],
});

module.exports = prodWebpackConfig;
