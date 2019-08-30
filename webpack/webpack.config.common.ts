import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
// @ts-ignore
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import { outputPath, srcPath } from './constants'
import getCssLoaders from './getCssLoaders'

const config: webpack.Configuration = {
  entry: ['./src/polyfill.ts', 'react-hot-loader/patch', './src/index.tsx'],

  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.scss'],

    alias: {
      'react-dom': '@hot-loader/react-dom',
      src: srcPath,
    },
  },

  output: {
    path: outputPath,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.m\.scss$/,
        use: getCssLoaders(true),
      },
      {
        test: /\.scss$/,
        use: getCssLoaders(false),
        exclude: /\.m\.scss$/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          fallback: 'file-loader',
          limit: 4096,
          outputPath: 'images/',
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
    }),

    new ProgressBarPlugin(),
  ],

  stats: {
    all: undefined,
    colors: true,
    children: false,
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}

export default config
