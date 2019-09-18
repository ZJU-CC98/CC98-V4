import path from 'path'

export const outputPath = path.join(__dirname, '../dist')
export const publicPath = '/static'
export const srcPath = path.join(__dirname, '../src')
export const contentBase = path.join(__dirname, '../public')
export const publicStylesheetPath = path.join(srcPath, './stylesheets')

export const isDev = process.env.NODE_ENV !== 'production'
