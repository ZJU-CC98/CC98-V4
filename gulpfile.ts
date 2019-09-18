import gulp from 'gulp'
import childProcess from 'child_process'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import log from 'fancy-log'
import del from 'del'
import PluginError from 'plugin-error'

import { outputPath } from './webpack/constants'

enum ENV {
  DEVELOPMENT = 'DEVELOPMENT',
  PRODUCTION = 'PRODUCTION',
}

enum CC98_ENV {
  INTRANET = 'intranet',
  INTRANET_TEST = 'intranet_test',
  PUBLIC = 'public',
}

async function getDevWebpackConfig() {
  return (await import('./webpack/webpack.config.dev')).default
}

async function getProdWebpackConfig() {
  return (await import('./webpack/webpack.config.prod')).default
}

async function checkGitChanges() {
  if (process.env.COMMIT_REF) {
    log('[checkGitChanges]', 'process.env.COMMIT_REF detected, abort git checking')

    return
  }

  try {
    childProcess.execSync('git diff-index --quiet HEAD --')
  } catch (e) {
    throw new PluginError(
      'webpack:build',
      new Error('uncommitted changes detected, commit before build')
    )
  }
}

async function setEnv(env: ENV, cc98Env: CC98_ENV) {
  process.env.NODE_ENV = env
  process.env.CC98_ENV = cc98Env
  process.env.GIT_HEAD =
    process.env.COMMIT_REF ||
    childProcess
      .execSync('git rev-parse HEAD')
      .toString()
      .trim()

  log(
    '[setEnv]',
    `using env NODE_ENV=${process.env.NODE_ENV} CC98_ENV=${process.env.CC98_ENV} GIT_HEAD=${process.env.GIT_HEAD}`
  )
}

async function build(done: () => void) {
  const config = await getProdWebpackConfig()
  webpack(config, (err, stats) => {
    if (err) {
      throw new PluginError('webpack:build', err)
    }

    log(
      '[webpack:build-dev]',
      stats.toString({
        colors: true,
      })
    )

    done()
  })
}

async function dev() {
  const config = await getDevWebpackConfig()
  const compiler = webpack(config)
  const option = config.devServer!

  WebpackDevServer.addDevServerEntrypoints(config, option)

  const server = new WebpackDevServer(compiler, option)

  server.listen(option.port!, option.host!, err => {
    if (err) {
      throw new PluginError('webpack:dev', err)
    }

    log('[webpack:dev-server]', `dev server listening on port ${option.port}`)
  })
}

async function clear() {
  await del([outputPath])
}

function getProdTasks(cc98Env: CC98_ENV) {
  return gulp.series(checkGitChanges, clear, setInternalEnv, build)

  async function setInternalEnv() {
    await setEnv(ENV.PRODUCTION, cc98Env)
  }
}

function getDevTasks(cc98Env: CC98_ENV) {
  return gulp.series(setInternalEnv, dev)

  async function setInternalEnv() {
    await setEnv(ENV.DEVELOPMENT, cc98Env)
  }
}

Object.values(CC98_ENV).forEach((cc98Env: CC98_ENV) => {
  gulp.task(`dev:${cc98Env}`, getDevTasks(cc98Env))
  gulp.task(`build:${cc98Env}`, getProdTasks(cc98Env))
})

gulp.task('dev', getDevTasks(CC98_ENV.INTRANET))
gulp.task('build', getProdTasks(CC98_ENV.INTRANET))
