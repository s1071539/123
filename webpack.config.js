const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
console.log(`***run webpack in ${process.env.NODE_ENV} mode***\n`);
console.log(process.env.SERVER_HOST);

module.exports = {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, "src"),
  entry: {
    index: "./js/index.js",
    a: "./js/a.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./js/[name].js?[hash:8]",
    clean: true,
  },
  module: {
    rules: [
      {
        // for myCss.css
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        // for myScss.scss
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: "asset",
        generator: {
          filename: "assets/images/[hash][ext][query]?[hash:8]", // 局部指定输出位置,这里配置的文件输出路径优先级比第一步配置的高
        },
        parser: {
          dataUrlCondition: {
            maxSize: 30 * 1024, // 限制于 30kb
          },
        },
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: "My Page TItle",
      myText: "text from HtmlWebpackPlugin",
      template: "./page/index.html",
      filename: "index.html",
      hash: true,
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: "./page/a.html",
      filename: "a.html",
      hash: true,
      chunks: ["a"],
    }),
    new CopyPlugin({
      patterns: [{ from: "assets", to: "assets" }],
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  devServer: {
    compress: false,
    port: 9000,
    open: true,
  },
};
