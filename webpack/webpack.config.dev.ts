import merge from 'webpack-merge'

import commonConfig from './webpack.config.common'
import { contentBase } from './constants'

const config = merge(
  {},
  commonConfig,
  {
    mode: 'development',

    devtool: 'cheap-module-eval-source-map',
  },
  // dev-server config
  {
    devServer: {
      disableHostCheck: true,
      historyApiFallback: true,
      port: 9804,
      contentBase,
      host: '0.0.0.0',
    },
  } as any
)

export default config
