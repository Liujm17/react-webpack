"use strict";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

const webpack = require("webpack");
//公共模块
const configFactory = require("./webpack.common");
//使用公共模块的话得用webpack-merge
const { merge } = require("webpack-merge");
//提示信息工具
const utils = require("./utils");
//端口占用寻找空闲端口
const portfinder = require("portfinder");
//打包友好错误提示
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

const devWebpackConfig = merge(new configFactory("development"), {
  //开启webpack-dev-server,
  devServer: {
    //路由错误解决方案加在output中加入publicPath: "/",
    historyApiFallback: true,
    //模版热更新
    hot: true,
    //开发环境打开时候的ip地址
    host: "localhost",
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3030,
    // 自动打开浏览器
    open: true,
    proxy: {
      // 一旦devServer(5000)服务器接受到 /api/xxx 的请求，就会把请求转发到另外一个服务器(3000)
      "/api": {
        target: "https://www.saddlepoint.cn:8004",
        // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
        changeOrigin: true,
        timeout: 36000000,
      },
    },
  },
  //插件
  plugins: [
   
    //启动热模块替换，webpack5后自带HotModuleReplacementPlugin
    new webpack.HotModuleReplacementPlugin(),
  ],
  //在第一个错误出现时抛出失败结果，而不是容忍它。默认情况下，当使用 HMR 时，webpack 会将在终端以及浏览器控制台中，以红色文字记录这些错误，但仍然继续进行打包。要启用它：
  bail: true,
  stats: "errors-only", // 项目打包配置终端输出日志,配合FriendlyErrorsPlugin会输出简洁的输出，只在错误时输出完整的
});


module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = devWebpackConfig.devServer.port || 8080;
    portfinder.getPort((err, port) => {
      if (err) {
        reject(err);
      } else {
        // add port to devServer config
        devWebpackConfig.devServer.port = port;
        // Add FriendlyErrorsPlugin
        devWebpackConfig.plugins.push(
          new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
              messages: [
                `你的本地项目地址: http://${devWebpackConfig.devServer.host}:${port}`,
              ],
            },
            //提示错误
            onErrors: utils.createNotifierCallback(),
            // 是否每次都清空控制台
            clearConsole: true,
          })
        );
        resolve(devWebpackConfig);
      }
    });
  });