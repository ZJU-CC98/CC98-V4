/* eslint-disable import/no-extraneous-dependencies */
import merge from 'webpack-merge'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import prod from './webpack.config.prod'

const config = merge({}, prod, {
  plugins: [new BundleAnalyzerPlugin()],
})

export default config
