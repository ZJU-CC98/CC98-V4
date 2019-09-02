import CC98_ENV_TYPE from 'src/constants/env'

// 默认内网环境
const CC98_ENV = process.env.CC98_ENV as CC98_ENV_TYPE

// eslint-disable-next-line import/no-dynamic-require
const envConfig = require(`../env/config.${CC98_ENV}.json`)

export default envConfig
