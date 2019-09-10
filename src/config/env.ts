import IEnvConfig from 'src/types/IEnvConfig'

const { CC98_ENV } = process.env

// eslint-disable-next-line import/no-dynamic-require
const envConfig: IEnvConfig = require(`../env/config.${CC98_ENV}.json`)

export default envConfig
