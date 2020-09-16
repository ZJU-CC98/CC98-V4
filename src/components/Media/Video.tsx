import React from 'react'

const DEFAULT_HEIGHT = `${28.8984375 * 16}px`

async function loadPlayer(isHLS: boolean) {
  if (isHLS) {
    await import('hls.js')
  }

  // @ts-ignore
  // await import('dplayer/dist/DPlayer.min.css')

  // @ts-ignore
  const DPlayer = await import('dplayer')

  return DPlayer
}

const Video: React.FC<{ src: string; title?: string }> = ({ src }) => {
  const isHLS = /\.m3u8$/.test(src)

  const root = React.useRef<HTMLDivElement>(null)

  const [height, setHeight] = React.useState(DEFAULT_HEIGHT)
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    let player: any

    loadPlayer(isHLS)
      .then(({ default: DPlayer }) => {
        player = new DPlayer({
          element: root.current,
          autoplay: false,
          preload: 'metadata',
          video: {
            url: encodeURI(src),
            type: isHLS ? 'hls' : undefined,
          },
        })

        if (player) {
          player.on('abort', () => null)

          // 对全屏下高度的调整
          player.on('fullscreen', () => setHeight('auto'))
          player.on('fullscreen_cancel', () => setHeight(DEFAULT_HEIGHT))
          player.on('webfullscreen', () => setHeight('100%'))
          player.on('webfullscreen_cancel', () => setHeight(DEFAULT_HEIGHT))
          root.current!.getElementsByClassName('dplayer-menu')[0].innerHTML =
            '<div class="dplayer-menu-item"><a target="_blank" href="https://github.com/MoePlayer/DPlayer">关于 DPlayer 播放器</a></div>'
        }
      })
      .catch(err => {
        setError(true)
        throw err
      })

    return () => {
      if (player) {
        player.destory()
        root.current!.innerHTML = ''
      }
    }
  }, [src])

  if (error) {
    return <span>播放器加载失败</span>
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ whiteSpace: 'normal', height }} ref={root} />
    </div>
  )
}

export default Video
