/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack'
import merge from 'webpack-merge'

import commonConfig from './webpack.config.common'
import { contentBase } from './constants'

const config = merge({}, commonConfig, {
  mode: 'development',

  devtool: 'cheap-module-eval-source-map',

  plugins: [new webpack.HotModuleReplacementPlugin()],

  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    port: 9804,
    host: '0.0.0.0',
    contentBase,
    hot: true,
  },
})

export default config
