const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

const config = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helpers.root('build'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin({
      filename: "[name].css",
      allChunks: true
    })
  ],

  devServer: {
    port:8081,
    historyApiFallback: true,
    stats: 'minimal',
    proxy: {
      '/api/*': {
        target: 'http://localhost:5050/'
      }
    }
  }
});
module.exports = config;

