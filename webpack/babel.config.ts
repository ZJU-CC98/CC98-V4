const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        esmodules: false,
      },
      useBuiltIns: 'entry',
      corejs: 3,
    },
  ],
  '@babel/react',
  '@babel/typescript',
]

const plugins = [
  'emotion',
  '@babel/plugin-transform-runtime',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-optional-chaining',
  [
    '@babel/plugin-proposal-class-properties',
    {
      loose: true,
    },
  ],
  [
    'transform-imports',
    {
      lodash: {
        // eslint-disable-next-line no-template-curly-in-string
        transform: 'lodash/${member}',
      },
      'lodash/fp': {
        // eslint-disable-next-line no-template-curly-in-string
        transform: 'lodash/fp/${member}',
      },
    },
  ],
]

if (process.env.NODE_ENV === 'development') {
  plugins.push('react-hot-loader/babel')
}

export default {
  presets,
  plugins,
}
