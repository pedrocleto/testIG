const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');

const config = {
  entry: {
    'vendor': './src/vendor.js',
    'app': './src/app/app.js'
  },

  resolve: {
    extensions: ['.js']
  },

  module: {
    rules: [
       {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015','react']
          }
        }
      },
      {
          test: /index\.html$/,
          loader: 'html-loader'
      },
      {
        test: /\.json$/,
        loader: 'file-loader?name=json/[name].[ext]',
        include: helpers.root('src', 'assets/json/api.json')
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: helpers.root('src', 'assets/json/api.json')
      },
      {
        test: /\.scss$/,
        use:  ExtractTextPlugin.extract({
          fallback: "style-loader",
          loader: "css-loader!sass-loader",
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=img/[name].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          loader: "css-loader",
          publicPath: "/build"
        })
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw'
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor']
    }),
      
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
module.exports = config;
