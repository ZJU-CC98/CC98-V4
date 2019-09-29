/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp'
import childProcess from 'child_process'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import log from 'fancy-log'
import del from 'del'
import PluginError from 'plugin-error'
// @ts-ignore
import SentryCli from '@sentry/cli'
import path from 'path'

import { outputPath, publicPath } from './webpack/constants'

const absolutePublicPath = path.join(outputPath, publicPath)
const sentryCLi = new SentryCli()

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
  const compiler = webpack(config)
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(new PluginError('webpack:build', err))
      }

      log(
        '[webpack:build-dev]',
        stats.toString({
          colors: true,
        })
      )

      resolve()
    })
  }).then(done)
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

async function uploadSourceMap() {
  // await sentryCLi.releases.new(process.env.GIT_HEAD)
  log('[uploadSourceMap]', `version: ${process.env.GIT_HEAD}`)
  log('[uploadSourceMap]', 'uploading source map')
  await sentryCLi.releases.uploadSourceMaps(process.env.GIT_HEAD, {
    include: [outputPath],
  })
  log('[uploadSourceMap]', 'uploading source map done')
  log('[uploadSourceMap]', 'setting commits')
  await sentryCLi.execute(['releases', 'set-commits', '--auto', process.env.NODE_ENV])
  log('[uploadSourceMap]', 'setting commits done')
  // await sentryCLi.releases.finalize(process.env.GIT_HEAD)
}

async function clearAfterBuild() {
  await del([`${path.join(absolutePublicPath, 'scripts')}/*.map`, `${outputPath}/README.md`])
}

function getProdTasks(cc98Env: CC98_ENV) {
  return gulp.series(
    // checkGitChanges,
    clear,
    setInternalEnv,
    build,
    // uploadSourceMap,
    clearAfterBuild
  )

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

gulp.task(
  'build:ci',
  gulp.series(
    checkGitChanges,
    clear,
    () => setEnv(ENV.PRODUCTION, CC98_ENV.PUBLIC),
    build,
    uploadSourceMap,
    clearAfterBuild
  )
)
