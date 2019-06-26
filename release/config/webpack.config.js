"use strict";
console.log(`\nThe current working directory is ${process.cwd()}\n`);
var __dirname = process.cwd();
process.argv.includes("--mode=production")
  ? (process.env.NODE_ENV = "production")
  : (process.env.NODE_ENV = "development"),
  console.log(`\nwebpack mode is ${process.env.NODE_ENV} !\n`);
const WorkboxWebpackPlugin = require("workbox-webpack-plugin"),
  safePostCssParser = require("postcss-safe-parser"),
  OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
  UglifyJsPlugin = require("uglifyjs-webpack-plugin"),
  TerserPlugin = require("terser-webpack-plugin"),
  VueLoaderPlugin = require("vue-loader/lib/plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  webpackEnv = process.env.NODE_ENV,
  isEnvDevelopment = "development" === webpackEnv,
  shouldUseSourceMap = isEnvDevelopment,
  webpack = require("webpack"),
  isEnvProduction = "production" === webpackEnv,
  path = require("path"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  { CleanWebpackPlugin: CleanWebpackPlugin } = require("clean-webpack-plugin");
(process.env.BABEL_ENV = process.env.NODE_ENV),
  (module.exports = {
    devServer: {
      contentBase: path.resolve(__dirname, "./dist"),
      hot: !0,
      port: 18080,
      inline: !0,
      open: !0,
      watchContentBase: !0
    },
    devtool: "inline-source-map",
    mode: process.env.NODE_ENV,
    entry: path.join(__dirname, "src", "index.js"),
    output: {
      globalObject:
        '( (typeof window !== "undefined" ? window : false) ||\n    (typeof WorkerGlobalScope !== "undefined" ? WorkerGlobalScope : false) ||\n    this)',
      filename: "bundle.[name].[hash].js",
      path: path.join(__dirname, "dist"),
      chunkFilename: "chunk.[name].[hash].js"
    },
    module: {
      strictExportPresence: !0,
      rules: [
        {
          test: /\.(less)$/,
          use: [
            isEnvDevelopment
              ? {
                  loader: "style-loader",
                  options: { sourceMap: shouldUseSourceMap }
                }
              : { loader: MiniCssExtractPlugin.loader },
            {
              loader: "css-loader",
              options: { sourceMap: shouldUseSourceMap }
            },
            {
              loader: "less-loader",
              options: { sourceMap: shouldUseSourceMap }
            }
          ]
        },
        { parser: { requireEnsure: !1 } },
        {
          test: /\.worker\.js$/,
          loader: "worker-loader",
          options: { name: "[name].[hash].worker.js", inline: !0 }
        },
        { test: /\.vue$/, loader: "vue-loader" },
        {
          test: /\.(css|sass|scss)$/,
          use: [
            isEnvDevelopment
              ? {
                  loader: "style-loader",
                  options: { sourceMap: shouldUseSourceMap }
                }
              : { loader: MiniCssExtractPlugin.loader },
            {
              loader: "css-loader",
              options: { sourceMap: shouldUseSourceMap }
            },
            {
              loader: "sass-loader",
              options: { sourceMap: shouldUseSourceMap }
            }
          ]
        },
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
              loader: "url-loader",
              options: {
                limit: 1e4,
                name: isEnvDevelopment
                  ? "[name].[hash].[ext]"
                  : "[name].[contenthash].[ext]"
              }
            },
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              loader: "babel-loader",
              options: {
                customize: require.resolve(
                  "babel-preset-react-app/webpack-overrides"
                ),
                cacheDirectory: !0,
                cacheCompression: isEnvProduction,
                compact: isEnvProduction
              },
              include: [path.resolve(__dirname, "src")],
              exclude: [path.resolve(__dirname, "node_modules")]
            },
            {
              test: /\.(js|mjs)$/,
              exclude: /@babel(?:\/|\\{1,2})runtime/,
              loader: require.resolve("babel-loader"),
              options: {
                babelrc: !1,
                configFile: !1,
                compact: !1,
                presets: [
                  [
                    require.resolve("babel-preset-react-app/dependencies"),
                    { helpers: !0 }
                  ]
                ],
                cacheDirectory: !0,
                cacheCompression: isEnvProduction,
                sourceMaps: shouldUseSourceMap
              }
            },
            {
              loader: require.resolve("file-loader"),
              exclude: [
                /\.vue$/,
                /\.(js|mjs|jsx|ts|tsx)$/,
                /\.html$/,
                /\.json$/,
                /\.(css|scss|sass|less)$/
              ],
              options: {
                name: isEnvDevelopment
                  ? "[name].[hash].[ext]"
                  : "[name].[contenthash].[ext]"
              }
            }
          ]
        }
      ]
    },
    plugins: [
      isEnvDevelopment && new webpack.NamedModulesPlugin(),
      isEnvProduction && new CleanWebpackPlugin(),
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      isEnvProduction &&
        new WorkboxWebpackPlugin.GenerateSW({
          clientsClaim: !0,
          importWorkboxFrom: "cdn"
        }),
      new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
        chunkFilename: "[name].[hash].chunk.css"
      }),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        title: " Progressive Web Application",
        inject: !0,
        minify: {
          removeComments: !0,
          collapseWhitespace: !0,
          removeRedundantAttributes: !0,
          useShortDoctype: !0,
          removeEmptyAttributes: !0,
          removeStyleLinkTypeAttributes: !0,
          keepClosingSlash: !0,
          minifyJS: !0,
          minifyCSS: !0,
          minifyURLs: !0,
          removeAttributeQuotes: !1
        },
        template: path.resolve(__dirname, "./src/index.html")
      })
    ].filter(Boolean),
    optimization: {
      runtimeChunk: { name: e => `runtime~${e.name}` },
      splitChunks: {
        chunks: "all",
        minSize: 3e4,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 5,
        name: !0
      },
      minimize: isEnvProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: { ecma: 8 },
            compress: { ecma: 5, warnings: !1, comparisons: !1, inline: 2 },
            mangle: { safari10: !0 },
            output: { ecma: 5, comments: !1, ascii_only: !0 }
          },
          parallel: !0,
          cache: !0,
          sourceMap: shouldUseSourceMap
        }),
        new UglifyJsPlugin({
          uglifyOptions: {
            output: { comments: !1 },
            mangle: !0,
            warnings: !1,
            compress: { drop_debugger: !0, drop_console: !0 }
          },
          cache: !0,
          parallel: !0,
          sourceMap: shouldUseSourceMap
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: !!shouldUseSourceMap && { inline: !1, annotation: !0 }
          }
        })
      ]
    }
  });
