// eslint-disable-next-line import/no-extraneous-dependencies
import autoprefixer from 'autoprefixer'
import { publicStylesheetPath } from './constants'

export const isDev = process.env.NODE_ENV !== 'production'

export default function getCssLoaders(isModule: boolean) {
  return [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: isModule
          ? {
              localIdentName: isDev ? '[name]_[local]_[hash:base64:5]' : '[hash:base64:5]',
            }
          : false,
        localsConvention: isModule ? 'camelCase' : undefined,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: [
          autoprefixer({
            remove: false,
            grid: 'autoplace',
          }),
        ],
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sassOptions: {
          includePaths: [publicStylesheetPath],
        },
      },
    },
  ]
}
