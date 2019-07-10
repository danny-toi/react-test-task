const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const env = process.env.NODE_ENV || 'development'

const entryPath = path.resolve(__dirname, 'src/client/index.js')
const distPath = path.resolve(__dirname, 'dist')

const commonRules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
      presets: [
        '@babel/preset-react',
        [
          '@babel/preset-env',
          {
            modules: false,
          },
        ],
      ],
      plugins: [
        require.resolve('react-hot-loader/babel'),
        '@babel/plugin-proposal-class-properties',
      ],
    },
  },
]

const commonPlugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: 'src/client/index.html',
  }),
]

let entry
let rules
let plugins

if (env) {
  entry = {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      entryPath,
    ],
  }

  rules = [
    {
      test: /\.scss|css$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: './postcss.config.js',
            },
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            outputStyle: 'expanded',
          },
        },
      ],
    },
  ]

  plugins = [
    new webpack.HotModuleReplacementPlugin(),
  ]
} else {
  entry = {
    app: [
      'babel-polyfill',
      entryPath,
    ],
  }

  rules = [
    {
      test: /\.scss|css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader',
          options: {
            minimize: true,
            importLoaders: 1,
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: './config/postcss.config.js',
            },
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            outputStyle: 'compressed',
          },
        },
      ],
    },
  ]

  plugins = [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ]
}

module.exports = {
  mode: env,
  devtool: env === 'development' ? 'source-map' : false,
  entry: entry,
  output: {
    filename: '[name].bundle.js',
    path: distPath,
    publicPath: '/',
  },
  module: {
    rules: commonRules.concat(rules),
  },
  plugins: commonPlugins.concat(plugins),
  devServer: {
    hot: true,
    contentBase: distPath,
    historyApiFallback: true,
    port: 9001,
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../node_modules'),
    ],
  },
}
