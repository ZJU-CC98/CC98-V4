import React from 'react'
import ReactDOM from 'react-dom'

import s from './LightBox.m.scss'

type ILightBoxProps = JSX.IntrinsicElements['img'] & {
  disabled?: boolean
}

const LightBox: React.FC<ILightBoxProps> = ({ disabled, onClick, style = {}, ...props }) => {
  const lightBoxRoot = React.useRef<HTMLDivElement>()
  const [isShown, setIsShown] = React.useState(false)

  const handleImgClick: React.MouseEventHandler<HTMLImageElement> = e => {
    if (!disabled) {
      lightBoxRoot.current = document.createElement('div')
      document.body.append(lightBoxRoot.current)
      setIsShown(true)
    }

    if (onClick) {
      onClick(e)
    }
  }

  const handleLightBoxClick = () => {
    setIsShown(false)
    lightBoxRoot.current!.remove()
    lightBoxRoot.current = undefined
  }

  return (
    <>
      <img {...props} style={{ cursor: 'pointer', ...style }} onClick={handleImgClick} />
      {!disabled &&
        isShown &&
        !!lightBoxRoot.current &&
        ReactDOM.createPortal(
          <div className={s.root} onClick={handleLightBoxClick}>
            <div className={s.content}>
              <img {...props} />
            </div>
          </div>,
          lightBoxRoot.current
        )}
    </>
  )
}

export default LightBox
