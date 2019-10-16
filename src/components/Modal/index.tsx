import React from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { noop } from 'lodash'
import useForceUpdate from 'src/hooks/useForceUpdate'

import s from './index.m.scss'

interface IModalProps {
  visible: boolean
  onClose: () => void

  title: string
  footer?: React.ReactNode
  maskClosable?: boolean
}

let currentOpenModalCount = 0

const Modal: React.FC<IModalProps> = ({
  visible,
  children,
  title,
  onClose,
  maskClosable = true,
  footer,
}) => {
  const root = React.useRef<HTMLDivElement>()
  const contentRoot = React.useRef<HTMLDivElement>(null)
  const forceUpdate = useForceUpdate()

  React.useEffect(() => {
    if (!visible) return

    root.current = document.createElement('div')
    document.body.append(root.current)
    currentOpenModalCount += 1
    document.body.style.overflow = 'hidden'
    forceUpdate()

    return () => {
      if (root.current) {
        root.current.remove()
      }
      currentOpenModalCount -= 1

      if (!currentOpenModalCount) {
        document.body.style.overflow = 'visible'
      }
    }
  }, [visible])

  if (!root.current || !visible) return null

  return ReactDOM.createPortal(
    <div onClick={maskClosable ? onClose : noop} className={s.root}>
      <div onClick={e => e.stopPropagation()} ref={contentRoot} className={s.content}>
        <div className={s.title}>
          <h3>{title}</h3>
          <span onClick={onClose}>
            <Icon icon={faTimes} />
          </span>
        </div>
        <div className={s.body}>{children}</div>
        {footer ? <div className={s.footer}>{footer}</div> : null}
      </div>
    </div>,
    root.current
  )
}

export default Modal
