import React from 'react'
import { IUbbConfig } from 'src/ubb/types'
import ubbReact from 'src/ubb/ubbReact'
import { RootStore } from 'src/store'
import { themeMap } from 'src/config/theme'
import { useSelector } from 'react-redux'

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

function selector(state: RootStore) {
  return {
    themeMode: themeMap[state.global.theme].mode,
  }
}

const UbbContainer: React.FC<IUbbProps> = ({ text, config = {} }) => {
  const innerConfig = { ...defaultConfig, ...config }

  const { themeMode } = useSelector(selector)

  return <>{ubbReact(text, innerConfig, themeMode)}</>
}

export default UbbContainer
