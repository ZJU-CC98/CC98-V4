import * as axios from 'axios'

declare module 'axios' {
  interface AxiosRequestConfig {
    ignoreCache?: boolean
  }
}
