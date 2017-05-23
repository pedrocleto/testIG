var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
process.env.publicPath = '/';

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-source-map',

  output: {
    path: helpers.root('build'),
    publicPath: process.env.publicPath,
    filename: 'assets/[name].js',
    chunkFilename: 'assets/[id].chunk.js'
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    //new webpack.optimize.UglifyJsPlugin(),
    /*new UglifyJsPlugin({
      compress: {
        warnings: true
      }
    }),*/
    //new ExtractTextPlugin('[name].css'),
    new ExtractTextPlugin({
      filename: "assets/[name].css",
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
    new CopyWebpackPlugin([
    ])
  ]
});
