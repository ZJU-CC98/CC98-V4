import * as axios from 'axios'

declare module 'axios' {
  interface AxiosRequestConfig {
    ignoreCache?: boolean

    needAuth?: boolean

    silent?: boolean
  }

  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
    (url: string): Promise<any>
  }
}
