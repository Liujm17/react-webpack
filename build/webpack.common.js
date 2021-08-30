//使用webpack需要安装webpack webpack-cli webpack-dev-server(webpack本地服务器)
const { resolve } = require("path");

//压缩css插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//postcss-normalize, 从browserList中使用 normalize.css 所需的部分 PostCSS标准化 使用规范Normalize允许你根据项目 browserList的使用 normalize.css 部分
const postcssNormalize = require("postcss-normalize");
//px2rem随屏幕大小缩放页面
const px2rem = require("postcss-px2rem");
//进度条插件，打包或者运行有进度条显示
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
//打包资源后各个包大小分析工具
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
//antd的moment替代工具，moment太大了
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
//html空白模版插件，可以按模版打包内容，并把打包的js css引入
const HtmlWebpackPlugin = require("html-webpack-plugin");

const paths = require('./paths');

//因为使用webpack.merge，此处为开发和生产的公共模块,导出为函数
module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";

  /**
   * cssOptions为loader配置
   * preProcessor为后面要加的loader如sass-loader
   * 需要安装: style-loader  css-loader mini-css-extract-plugin postcss-loader postcss-preset-env
   * postcss-flexbugs-fixes(解决flexbug问题)
   * resolve-url-loader(路径处理器)
   */
  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      //开发环境使用不压缩的style-loader
      isEnvDevelopment && require.resolve("style-loader"),
      //生产环境使用压缩的mini-css-extract-plugin
      isEnvProduction && MiniCssExtractPlugin.loader,
      {
        loader: require.resolve("css-loader"),
        options: cssOptions,
      },
      /*
            css兼容性处理：postcss --> postcss-loader postcss-preset-env

            (postcss-preset-env)帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
              🍎(last 1 chrome version:兼容最近的一个chreme版本)
              (>0.2%:大于百分之99.8的浏览器，not dead不要死的，not op_mini all不要op_mini所有的，都死完了)
            "browserslist": {
              // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
              "development": [
                "last 1 chrome version",
                "last 1 firefox version",
                "last 1 safari version"
              ],
              // 生产环境：默认是看生产环境
              "production": [
                ">0.2%",
                "not dead",
                "not op_mini all"
              ]
            }
          */
      {
        loader: require.resolve("postcss-loader"),
        options: {
          ident: "postcss",
          plugins: () => [
            //用于解决flexbug
            require("postcss-flexbugs-fixes"),
            require("postcss-preset-env")({
              autoprefixer: {
                flexbox: "no-2009",
              },
              stage: 3,
            }),
            postcssNormalize(),
            px2rem({
              remUnit: 32, //基准大小 baseSize，需要和rem.js中相同
            }),
          ],
          //开启映射
          sourceMap: true,
        },
      },
    ].filter(Boolean);
    //其他的loader
    if (preProcessor) {
      loaders.push(
        //路径处理器
        {
          loader: require.resolve("resolve-url-loader"),
          options: {
            sourceMap: true,
          },
        },
        //其他的loaders
        {
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true,
          },
        }
      );
    }
    return loaders;
  };
  return {
    //入口
    entry: {
      index: paths.appIndexJs,
    },
    //出口
    output: {
      /*
  缓存：
    babel缓存
      cacheDirectory: true
      --> 让第二次打包构建速度更快
    文件资源缓存
      hash: 每次wepack构建时会生成一个唯一的hash值。
        问题: 因为js和css同时使用一个hash值。
          如果重新打包，会导致所有缓存失效。（可能我却只改动一个文件）
      chunkhash：根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样
        问题: js和css的hash值还是一样的
          因为css是在js中被引入的，所以同属于一个chunk
      contenthash: 根据文件的内容生成hash值。不同文件hash值一定不一样    
      --> 让代码上线运行缓存更好使用
*/
      filename: "js/[name].[contenthash:10].js",
      chunkFilename: isEnvProduction
        ? "static/js/[name].[contenthash:8].chunk.js"
        : isEnvDevelopment && "static/js/[name].chunk.js",
      path: paths.outputPath,
      publicPath: isEnvDevelopment ? "/" : isEnvProduction && "./",
      clean: true,
    },
    //loaders
    module: {
      rules: [
        {
          //使用oneOf让loader只匹配一次，提升性能
          //注意:不能有两个配置处理同一种类型
          oneOf: [
            {
              test: /\.css$/,
              use: getStyleLoaders({ importLoaders: 2 }), //importLoaders表示sass会被几个loader处理
              //关闭tree shaking css文件得关闭
              sideEffects: true,
            },
            {
              test: /\.s[ac]ss$/i,
              exclude: /\.module\.(scss|sass)$/,
              use: getStyleLoaders({ importLoaders: 2 }, "sass-loader").concat({
                loader: "sass-resources-loader",
                options: {
                  resources: [
                    // 这里按照你的文件路径填写,公共的scss文件路径
                    resolve(__dirname, "../src/assets/scss/utils.scss"),
                  ],
                },
              }),
              //有副作用，关闭树摇
              sideEffects: true,
            },
            {
              // 处理图片资源
              test: /\.(jpg|png|gif)$/,
              type: "asset/resource",
            },
            {
              // 处理其他资源
              exclude: /\.(html|js|css|less|scss|jpg|png|gif)/,
              loader: "file-loader",
              options: {
                name: "[hash:10].[ext]",
                outputPath: "media",
              },
            },
            //最重要的react需要处理js和jsx
            //babel-loader @babel/core(很重要哦) @babel/preset-env(预处理器)  @babel/preset-react(react的编译器)
            //babel-plugin-import可以按需导入antd
            //🌟这里提一下,预处理器应该使用 core-js 按需加载来提升性能
            {
              test: /(.js|.jsx)$/,
              exclude: /node_modules/,
              loader: "babel-loader",
              //options里的具体配置再babelrc里
              options: {
                //开启babel缓存，配合output的包hash模式
                //开启缓存后，第二次构建会读取之前的缓存
                cacheDirectory: true,
                //其他配置在babelrc里
              },
            },
          ],
        },
      ],
    },
    //插件
    plugins: [
      //html模版
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        minify: {
          //清除空格
          collapseWhitespace: true,
          // 移除注释
          removeComments: true,
        },
      }),
       //进度条样式2
       new ProgressBarPlugin({
        format: `  :msg [:bar] ${require('chalk').green.bold(':percent')} (:elapsed s)`
      }),
      //antd的momentjs的替代方案
      new AntdDayjsWebpackPlugin(),
      //包分析工具
      new BundleAnalyzerPlugin({
        //  可以是`server`，`static`或`disabled`。
        //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
        //  在“静态”模式下，会生成带有报告的单个HTML文件。
        //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
        analyzerMode: "server",
        //  将在“服务器”模式下使用的主机启动HTTP服务器。
        analyzerHost: "127.0.0.1",
        //  将在“服务器”模式下使用的端口启动HTTP服务器。
        analyzerPort: 8888,
        //  路径捆绑，将在`static`模式下生成的报告文件。
        //  相对于捆绑输出目录。
        reportFilename: "report.html",
        //  模块大小默认显示在报告中。
        //  应该是`stat`，`parsed`或者`gzip`中的一个。
        //  有关更多信息，请参见“定义”一节。
        defaultSizes: "parsed",
        //  在默认浏览器中自动打开报告
        openAnalyzer: false,
        //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
        generateStatsFile: false,
        //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
        //  相对于捆绑输出目录。
        statsFilename: "stats.json",
        //  stats.toJson（）方法的选项。
        //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
        //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
        statsOptions: null,
        logLevel: "info", // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
      }),
    ],
    //模式
    mode: isEnvProduction ? "production" : isEnvDevelopment && "development",
    //调试映射方式
    devtool: isEnvProduction
      ? "source-map"
      : isEnvDevelopment && "eval-source-map",
  };
};
