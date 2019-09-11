import axios from 'axios'
import { IUser } from '@cc98/api'
import { getLocalStorage, setLocalStorage } from 'src/utils/storage'

export async function getMe() {
  const storageUser = getLocalStorage('userInfo')

  if (storageUser) {
    return storageUser
  }

  const me: IUser = await axios({
    url: '/me',
    needAuth: true,
  })

  setLocalStorage('userInfo', me, 3600)

  return me
}
