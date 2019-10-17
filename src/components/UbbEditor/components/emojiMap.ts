import { range, padStart } from 'lodash'

export enum EMOJI_TYPE {
  AC = 'ac',
  MJ = 'mj',
  TB = 'tb',
  MS = 'ms',
  EM = 'em',
}

export function getEmojiTitle(type: EMOJI_TYPE) {
  switch (type) {
    case EMOJI_TYPE.AC:
      return 'AC娘'
    case EMOJI_TYPE.EM:
      return '经典'
    case EMOJI_TYPE.MJ:
      return '麻将脸'
    case EMOJI_TYPE.MS:
      return '雀魂'
    case EMOJI_TYPE.TB:
      return '贴吧'
    default:
      return '未知'
  }
}

export function getEmojiDesc(type: EMOJI_TYPE) {
  switch (type) {
    case EMOJI_TYPE.AC:
      return {
        url: '//www.acfun.cn',
        name: 'AcFun弹幕视频网',
      }
    case EMOJI_TYPE.MS:
      return {
        url: '',
        name: '雀魂Majsoul',
      }
    case EMOJI_TYPE.MJ:
      return {
        url: '//bbs.saraba1st.com/2b/forum.php',
        name: 'stage1st论坛',
      }
    case EMOJI_TYPE.TB:
      return {
        url: '//tieba.baidu.com',
        name: '百度贴吧',
      }
    default:
      return null
  }
}

const MJ_ANIMAL = [
  '001',
  '002',
  '003',
  '004',
  '005',
  '006',
  '007',
  '008',
  '009',
  '010',
  '011',
  '012',
  '013',
  '014',
  '015',
  '016',
]
const MJ_CARTON = ['003', '018', '019', '046', '049', '059', '096', '134', '189', '217']

const makeFormatEmoji = (prefix: string) => (item: string) => `[${prefix}${item}]`

const emojiMap = {
  [EMOJI_TYPE.AC]: [
    ...range(1, 55), // wrap
    ...range(1001, 1041),
    ...range(2001, 2056),
  ]
    .map(item => padStart(`${item}`, 2, '0'))
    .map(makeFormatEmoji('ac')),
  [EMOJI_TYPE.MJ]: [
    ...MJ_ANIMAL.map(makeFormatEmoji('a:')),
    ...MJ_CARTON.map(makeFormatEmoji('c:')),
    ...range(1, 209)
      .map(item => padStart(`${item}`, 3, '0'))
      .map(makeFormatEmoji('f:')),
  ],
  [EMOJI_TYPE.EM]: [...range(0, 44), ...range(71, 92)]
    .map(item => padStart(`${item}`, 2, '0'))
    .map(makeFormatEmoji('em')),
  [EMOJI_TYPE.MS]: range(1, 55)
    .map(item => padStart(`${item}`, 2, '0'))
    .map(makeFormatEmoji('ms')),
  [EMOJI_TYPE.TB]: range(1, 34)
    .map(item => padStart(`${item}`, 2, '0'))
    .map(makeFormatEmoji('tb')),
}

export default emojiMap
