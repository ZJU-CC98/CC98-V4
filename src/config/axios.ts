import axios from 'axios'
import makeCustomAxiosAdapter from 'src/utils/customAxiosAdapter'
import cacheConfigs from 'src/config/cache'

axios.defaults.adapter = makeCustomAxiosAdapter(cacheConfigs)
