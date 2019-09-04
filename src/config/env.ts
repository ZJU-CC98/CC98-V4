import CC98_ENV_TYPE from 'src/constants/env'
import IEnvConfig from 'src/types/IEnvConfig'

const CC98_ENV = process.env.CC98_ENV as CC98_ENV_TYPE

// eslint-disable-next-line import/no-dynamic-require
const envConfig: IEnvConfig = require(`../env/config.${CC98_ENV}.json`)

export default envConfig
