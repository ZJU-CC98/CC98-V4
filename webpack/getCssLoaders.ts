import autoprefixer from 'autoprefixer'
import { isDev, publicStylesheetPath } from './constants'

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
            grid: 'no-autoplace',
          }),
        ],
      },
    },
    {
      loader: 'sass-loader',
      options: {
        includePaths: [publicStylesheetPath],
      },
    },
  ]
}
