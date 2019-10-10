import { IUser } from '@cc98/api'
import { IMAGE_BASE_PATH } from 'src/constants/path'

export const userAvatarBoxImgMap: Record<number, string | undefined> = {
  82: '吉祥物.png',
  18: '_01版主.png',
  22: '_01版主.png',
  85: '_02编辑部.png',
  29: '_02编辑部.png',
  37: '_03技术组.png',
  23: '_03技术组.png',
  28: '_04贵宾.png',
  16: '_04贵宾.png',
  84: '_05策划部.png',
  34: '_05策划部.png',
  96: '_06影音部.png',
  99: '_06影音部.png',
  32: '_07站务组.png',
  21: '_07站务组.png',
  86: '_08体育部.png',
  35: '_08体育部.png',
  94: '_09办公室.png',
  93: '_09办公室.png',
  91: '_10认证用户.png',
}

export function getAvatarBoxImgUrl(user: Pick<IUser, 'displayTitleId'>) {
  if (!user.displayTitleId || !userAvatarBoxImgMap[user.displayTitleId]) {
    return null
  }

  return `${IMAGE_BASE_PATH}/相框/${userAvatarBoxImgMap[user.displayTitleId]}`
}
