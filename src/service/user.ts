import axios from 'axios'
import { IUser } from '@cc98/api'
import { setLocalStorage } from 'src/utils/storage'

export async function getMe() {
  const me: IUser = await axios({
    url: '/me',
    needAuth: true,
  })

  setLocalStorage('userInfo', me)

  return me
}
