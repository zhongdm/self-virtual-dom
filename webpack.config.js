const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9100
  },
  resolve: {
    extensions: ['.js', '.vue', '.css']
  },
  plugins: [
    // 入口html
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: "index.html",
      template: "index.html"
    })
  ],
  mode: 'development'
}