const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
  filename: './css/app.[hash:8].css'
});

const config = {
  context: path.resolve(__dirname, 'source'),
  entry: {
    app: './index.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: './js/[name].[hash:8].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /source/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['env']
          }
        }
      },
      { 
        test: /\.html$/, 
        use: ['html-loader'] 
      },
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, 'source', './sass')],
        use: extractPlugin.extract({
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            }
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/image/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/fonts'
            }
          }
        ],
      },
      // {
      //   test: /\.(jpe?g|png|gif|svg)/,
      //   loader: 'url-loader',
      //   query: {
      //     limit: 10000, // Aqui o loader só vai ser aplicado para arquivo com atá 10MB aprox.
      //     name: '[name].[hash:8].[ext]'
      //   }
      // },
      // Aplicando compressão de imagens
      // {
      //   test: /\.(jpe?g|png|gif|svg)/,
      //   loader: 'image-webpack-loader',
      //   query: {
      //     mozjpeg:{
      //       quality: 65
      //     }
      //   }
      // }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['public']),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'source', 'index.html'),
      // filename: 'index.html',
      // chunks: ['app', 'vendor']
    }),
    extractPlugin,
    // new webpack.optimize.CommonsChunkPlugins({
    //   name: 'vendor',
    //   filename: 'vendor.[hash:8].bundle.js',
    //   minChunks: 2
    // }),
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jqueryapp',
    // }),
    new CopyWebpackPlugin([
      {from:'image',to:'image'},
      {from:'fonts',to:'fonts'},
    ]),
    // new MomentLocalesPlugin(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./public"),
    compress: true,
    port: 3800,
    stats: 'errors-only',
    open: true
  },
  devtool: false
}

module.exports = config;