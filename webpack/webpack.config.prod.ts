import merge from 'webpack-merge'
import TerserPlugin from 'terser-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
// @ts-ignore
import CopyWebpackPlugin from 'copy-webpack-plugin'
// @ts-ignore
import SentryWebpackPlugin from '@sentry/webpack-plugin'

import commonConfig from './webpack.config.common'

const config = merge({}, commonConfig, {
  mode: 'production',

  output: {
    filename: '[name]-[chunkhash:8].js',
  },

  optimization: {
    minimizer: [new TerserPlugin()],
  },

  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new CopyWebpackPlugin([
      {
        from: 'public',
        to: '.',
      },
    ]),
    new SentryWebpackPlugin({
      include: 'src',
      ignore: ['node_modules', 'webpack'],
    }),
  ],
})

export default config
