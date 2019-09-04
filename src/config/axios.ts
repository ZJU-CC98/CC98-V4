import axios from 'axios'
import makeCustomAxiosAdapter from 'src/utils/customAxiosAdapter'
import cacheConfigs from 'src/config/cache'
import env from './env'

axios.defaults.adapter = makeCustomAxiosAdapter(cacheConfigs)
axios.defaults.baseURL = env.APIUrl
