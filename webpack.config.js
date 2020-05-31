const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const express = require('express');

module.exports = {
  entry: './src/script.js',
  target: "web",
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "./src/index.html")
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [ 'file-loader' ],
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  devServer: {
    setup (app) {
      app.use('/materials/',
      express.static(path.join(__dirname, 'materials')));
    },
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};
