const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const WebpackBarPlugin = require('webpackbar')

const resolve = (file) => path.resolve(__dirname, file)
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  output: {
    path: resolve('../public'),
    publicPath: '/public/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.vue'],
    alias: {
      'components': resolve('../src/components'),
      'mixins': resolve('../src/mixins'),
      'pages': resolve('../src/pages'),
      'router': resolve('../src/router'),
      'store': resolve('../src/store'),
      'static': resolve('../static'),
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loaders: ['vue-loader']
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file)
      },
      {
        test: /\.css$/,
        loaders: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.s(c|a)ss$/,
        loaders: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd ? [
    new MiniCssExtractPlugin({
      filename: 'common.[chunkhash].css'
    }),
    new VueLoaderPlugin()
  ] : [
    new FriendlyErrorsPlugin(),
    new VueLoaderPlugin(),
    new WebpackBarPlugin()
  ]
}
