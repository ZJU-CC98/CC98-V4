import React from 'react'
import { IMAGE_BASE_PATH } from 'src/constants/path'

const Audio: React.FC<{ src: string; title?: string }> = ({ src, title }) => {
  const root = React.useRef<HTMLDivElement>(null)
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    let player: any

    // @ts-ignore
    import('aplayer/dist/APlayer.min.css')
      .then(() => {
        // @ts-ignore
        return import('aplayer')
      })
      .then(({ default: Aplayer }) => {
        player = new Aplayer({
          element: root.current,
          autoplay: false,
          preload: 'metadata',
          music: {
            url: encodeURI(src),
            title: title || encodeURI(src),
            author: '',
            pic: `${IMAGE_BASE_PATH}/audio_cover.png`,
          },
        })
      })
      .catch(err => {
        setError(true)
        throw err
      })

    return () => {
      if (player && player.destory) player.destory()
    }
  }, [src, title])

  if (error) {
    return <span>播放器加载失败</span>
  }

  return <div style={{ whiteSpace: 'normal', width: 480 }} ref={root} />
}

export default Audio
