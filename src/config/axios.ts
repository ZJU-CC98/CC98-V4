import axios from 'axios'
import makeCustomAxiosAdapter from 'src/utils/customAxiosAdapter'
import cacheConfigs from 'src/config/cache'
import notice from 'src/utils/notice'
import env from 'src/config/env'
import { getLocalStorage, setLocalStorage } from 'src/utils/storage'
import { refreshToken } from 'src/service/oauth'

axios.defaults.adapter = makeCustomAxiosAdapter(cacheConfigs)
axios.defaults.baseURL = env.APIUrl
axios.defaults.validateStatus = status => {
  return status >= 200 && status < 400
}

export function defaultAxiosErrorHandler(error: any) {
  if ((error && error.hasNotified) || (error.config && error.config.silent)) {
    throw error
  }

  if (error instanceof axios.Cancel) {
    throw error
  }

  error.hasNotified = true

  // eslint-disable-next-line no-console
  console.error(error)

  notice({
    content: error.response && error.response.data ? error.response.data : error.message,
  })

  throw error
}

axios.interceptors.response.use(res => {
  return res.data
}, defaultAxiosErrorHandler)

axios.interceptors.request.use(baseConfig => {
  if (baseConfig.needAuth) {
    const accessToken = getLocalStorage('accessToken')
    const token = getLocalStorage('refreshToken')

    if (accessToken) {
      baseConfig.headers = baseConfig.headers || {}
      baseConfig.headers.Authorization = accessToken
      return baseConfig
    }

    if (token) {
      // eslint-disable-next-line camelcase
      return refreshToken(token).then(({ access_token, token_type, expires_in }) => {
        // eslint-disable-next-line camelcase
        const newToken = `${token_type} ${access_token}`
        // eslint-disable-next-line camelcase
        setLocalStorage('accessToken', newToken, expires_in)

        baseConfig.headers = baseConfig.headers || {}
        baseConfig.headers.Authorization = newToken
        return baseConfig
      })
    }
  }

  return baseConfig
})
