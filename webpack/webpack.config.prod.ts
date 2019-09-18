import webpack from 'webpack'
import merge from 'webpack-merge'
import TerserPlugin from 'terser-webpack-plugin'
// @ts-ignore
import CopyWebpackPlugin from 'copy-webpack-plugin'

import commonConfig from './webpack.config.common'

const config = merge({}, commonConfig, {
  mode: 'production',

  devtool: false,

  output: {
    filename: 'static/scripts/[name]-[chunkhash:8].js',
    sourceMapFilename: 'static/scripts/[name]-[chunkhash:8].js.map',
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
      }),
    ],
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'public',
        to: '.',
      },
    ]),

    new webpack.SourceMapDevToolPlugin({
      test: [/\.[tj]sx?$/],
      filename: 'static/scripts/[name]-[chunkhash:8].js.map',
    }),
  ],
})

export default config
