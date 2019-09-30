import React from 'react'
import ReactDOM from 'react-dom'

import s from './LightBox.m.scss'

type ILightBoxProps = JSX.IntrinsicElements['img'] & {
  disabled?: boolean
}

const lightBoxRoot = document.createElement('div')
document.body.append(lightBoxRoot)

const LightBox: React.FC<ILightBoxProps> = ({ disabled, onClick, style = {}, ...props }) => {
  const [isShown, setIsShown] = React.useState(false)

  const handleImgClick: React.MouseEventHandler<HTMLImageElement> = e => {
    if (!disabled) {
      setIsShown(true)
    }

    if (onClick) {
      onClick(e)
    }
  }

  const handleLightBoxClick = () => {
    setIsShown(false)
  }

  return (
    <>
      <img {...props} style={{ cursor: 'pointer', ...style }} onClick={handleImgClick} />
      {ReactDOM.createPortal(
        !disabled && isShown && (
          <div className={s.root} onClick={handleLightBoxClick}>
            <div className={s.content}>
              <img {...props} />
            </div>
          </div>
        ),
        lightBoxRoot
      )}
    </>
  )
}

export default LightBox
