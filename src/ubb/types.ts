import React from 'react'
import { TagNode } from '@cc98/ubb-core/dist'
import { THEME_MODE } from 'src/constants/theme'

export interface IUbbConfig {
  /**
   * 是否允许显示图像。
   */
  allowImage?: boolean
  /**
   * 是否允许显示外部图像
   */
  allowExternalImage?: boolean
  /**
   * 是否允许点击图片后弹出灯箱以显示完整图片
   */
  allowLightBox?: boolean
  /**
   * 是否允许多媒体资源，如视频，音频，Flash 等。
   */
  allowMediaContent?: boolean
  /**
   * 是否允许自动播放多媒体资源。
   */
  allowAutoPlay?: boolean
  /**
   * 是否允许解析表情。
   */
  allowEmotion?: boolean
  /**
   * 是否允许解析markdown
   */
  allowMarkDown?: boolean
  /**
   * 最大允许的图片数量
   *
   */
  maxImageCount?: number
}

export interface IContext {
  config: Required<IUbbConfig>
  /**
   * 最外层的 [quote]
   */
  quoteRoot?: TagNode | null
  /**
   * 嵌套引用列表
   */
  quotes: React.ReactNode[][]

  imageBasePath: string

  themeMode: THEME_MODE
}
