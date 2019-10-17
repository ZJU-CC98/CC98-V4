import React from 'react'
import {
  ConfigType,
  ExtendValueType,
  ICustomComponentProps,
  IUBBExtendConfig,
} from '@cc98/react-ubb-editor/lib'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faImage, faUpload } from '@fortawesome/free-solid-svg-icons'
import { uploadFiles } from 'src/service/file'

import s from './image.m.scss'

const ExtraComponent: React.FC<ICustomComponentProps> = ({ dispatch }) => {
  const [isLossless, setIsLossless] = React.useState(false)

  const handleUpload = (e: Event) => {
    const target = e.target as HTMLInputElement

    if (!target.files || !target.files.length) {
      target.value = ''
      return Promise.resolve()
    }

    return uploadFiles(target.files, !isLossless)
      .then(urls => {
        urls.forEach(url => {
          dispatch({
            type: ConfigType.Extend,
            tagName: 'img',
            payload: {
              content: url,
            },
          })
        })
      })
      .finally(() => {
        target.remove()
      })
  }

  const handleClick = () => {
    const input = createInput()
    document.body.append(input)
    input.onchange = handleUpload
    input.click()

    // http://trishulgoel.com/handle-cancel-click-on-file-input/
    document.body.onfocus = handleFocus

    function handleFocus() {
      input.remove()
      document.body.onfocus = null
    }
  }

  return (
    <div className={s.label}>
      <button onClick={handleClick} type="button">
        <Icon icon={faUpload} />
      </button>
      <span className={s.lossless} onClick={() => setIsLossless(!isLossless)}>
        <input type="checkbox" readOnly checked={isLossless} />
        <button type="button">无损上传</button>
      </span>
    </div>
  )
}

const config: IUBBExtendConfig = {
  ExtraComponent: ExtraComponent as any,
  type: 1,
  tagName: 'img',
  title: '插入图片',
  icon: faImage,
  index: 111,

  inputs: [
    {
      label: '请输入图片URL',
      type: ExtendValueType.Content,
      key: '',
    },
  ],
}

export default config

function createInput() {
  const input = document.createElement('input')
  input.type = 'file'
  input.multiple = true
  input.accept = 'image/*'
  input.className = s.input

  return input
}
