import { ITagHandler } from '@cc98/ubb-core'
import React from 'react'
import Lazy from 'react-lazyload'
import URL from 'url-parse'
import { IContext } from 'src/ubb/types'
import Button from 'src/components/Button'
import s from 'src/ubb/style.m.scss'
import LightBox from 'src/components/Image/LightBox'
import { EVENT, eventBus } from 'src/utils/event'

const Image: React.FC<{
  src: string
  alt: string
  initIsShown: boolean
  allowLightBox: boolean
}> = ({ src, alt, initIsShown, allowLightBox }) => {
  const [isShown, setIsShown] = React.useState(initIsShown)

  React.useEffect(() => {
    function handleShowAll() {
      setIsShown(true)
    }

    eventBus.on(EVENT.EXPAND_ALL_PICTURE, handleShowAll)

    return () => {
      eventBus.off(EVENT.EXPAND_ALL_PICTURE, handleShowAll)
    }
  }, [])

  if (!isShown) {
    return (
      <Button style={{ marginTop: 16 }} primary border onClick={() => setIsShown(true)}>
        点击查看图片
      </Button>
    )
  }

  return (
    <Lazy once height={300} offset={100}>
      <LightBox className={s.img} src={src} alt={alt} disabled={!allowLightBox} />
    </Lazy>
  )
}

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node, { config }: IContext) {
    const src = node.innerText

    if (
      !config.allowImage ||
      (!config.allowExternalImage && !/cc98\.org$/.test(URL(src).hostname))
    ) {
      return (
        <a href={src} target="_blank" rel="noreferrer noopener">
          {src}
        </a>
      )
    }

    const initIsShown = !parseInt(node.tagData.img || '0', 10)

    return (
      <Image
        src={src}
        alt={node.tagData.title}
        initIsShown={initIsShown}
        allowLightBox={config.allowLightBox}
      />
    )
  },
}

export default handler
