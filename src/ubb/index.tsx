import React from 'react'
import { IUbbConfig } from 'src/ubb/types'
import ubbReact from 'src/ubb/ubbReact'

const defaultConfig: Required<IUbbConfig> = {
  allowAutoPlay: true,
  allowEmotion: true,
  allowExternalImage: true,
  allowImage: true,
  allowLightBox: false,
  allowMarkDown: true,
  allowMediaContent: true,
  maxImageCount: Infinity,
}

interface IUbbProps {
  text: string
  config?: IUbbConfig
}

const UbbContainer: React.FC<IUbbProps> = ({ text, config = {} }) => {
  const innerConfig = { ...defaultConfig, ...config }

  return <>{ubbReact(text, innerConfig)}</>
}

export default UbbContainer
