import dayjs from 'dayjs'

const ONE_MINUTE = 60 * 1000
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24

export function formatTime(item: string | number) {
  const date = new Date(item).getTime()
  const fromNow = Date.now() - date

  if (fromNow < ONE_HOUR) {
    const minutes = Math.floor(fromNow / ONE_MINUTE)

    return `${minutes > 0 ? minutes : 0}分钟前`
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (date > today.getTime()) {
    return dayjs(date).format('今天 HH:mm:ss')
  }

  if (date > today.getTime() - ONE_DAY) {
    return dayjs(date).format('昨天 HH:mm:ss')
  }

  if (date > today.getTime() - 2 * ONE_DAY) {
    return dayjs(date).format('前天 HH:mm:ss')
  }

  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

export function formatCount(count: number) {
  if (count > 100000) {
    return `${Math.floor(count / 10000)}万`
  }

  if (count > 10000) {
    return `${Math.floor(count / 1000) / 10}万`
  }

  return `${count}`
}
