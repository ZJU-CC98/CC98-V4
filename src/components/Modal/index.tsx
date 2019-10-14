import React from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { noop } from 'lodash'
import useClickOutside from 'src/hooks/useClickOutside'

import s from './index.m.scss'

interface IModalProps {
  visible: boolean
  onClose: () => void

  title: string
  footer?: React.ReactNode
  maskClosable?: boolean
}

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

  React.useEffect(() => {
    if (!visible) return

    root.current = document.createElement('div')
    document.body.append(root.current)
    document.body.style.overflow = 'hidden'

    return () => {
      if (root.current) {
        root.current.remove()
      }
      document.body.style.overflow = 'visible'
    }
  }, [visible])

  useClickOutside(maskClosable ? onClose : noop, contentRoot)

  if (!root.current) return null

  return ReactDOM.createPortal(
    <div className={s.root}>
      <div ref={contentRoot} className={s.content}>
        <div className={s.title}>
          <h3>{title}</h3>
          <span onClick={onClose}>
            <Icon icon={faTimes} />
          </span>
        </div>
        <div className={s.body}>{children}</div>
        {footer && <div className={s.footer}>{footer}</div>}
      </div>
    </div>,
    root.current
  )
}

export default Modal
