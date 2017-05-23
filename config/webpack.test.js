module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.js']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          use: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.html$/,
        use: 'html-loader'

      },
      {
        test: /\.scss$/,
        use: 'null'

      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'null'
      },
      {
        test: /\.css$/,
        use: 'null'
      }
    ]
  }
}
