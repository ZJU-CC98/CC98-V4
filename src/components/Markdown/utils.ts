import { Converter } from 'showdown'
// @ts-ignore
import showdownXSSFilter from 'showdown-xss-filter'

type ConvertFunc = (text: string) => Promise<string>

const showdown = new Converter({
  extensions: [showdownXSSFilter],
})

showdown.setOption('tables', true)

export const convert: ConvertFunc = text => {
  return Promise.resolve(showdown.makeHtml(text))
}
