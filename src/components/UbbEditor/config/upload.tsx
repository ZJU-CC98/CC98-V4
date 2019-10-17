import React from 'react'
import { ConfigType, ICustomComponentProps, IUBBCustomConfig } from '@cc98/react-ubb-editor/lib'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { uploadFiles } from 'src/service/file'

const ExtraComponent: React.FC<ICustomComponentProps> = ({ dispatch }) => {
  const handleUpload: React.ChangeEventHandler<HTMLInputElement> = e => {
    const target = e.target as HTMLInputElement

    if (!target.files || !target.files.length) {
      target.value = ''
      return Promise.resolve()
    }

    return uploadFiles(target.files)
      .then(urls => {
        urls.forEach((url, index) => {
          dispatch({
            type: ConfigType.Extend,
            tagName: getTagNameByFile(target.files![index]),
            payload: {
              content: url,
            },
          })
        })
      })
      .finally(() => {
        target.value = ''
      })
  }

  return (
    <input
      style={{ display: 'none' }}
      type="file"
      id="ubb-upload"
      multiple
      onChange={handleUpload}
    />
  )
}

const config: IUBBCustomConfig = {
  type: 2,
  tagName: 'upload',
  title: '上传文件',
  // eslint-disable-next-line jsx-a11y/control-has-associated-label
  label: (
    <label style={{ cursor: 'pointer' }} htmlFor="ubb-upload">
      <Icon icon={faFile} />
    </label>
  ),
  index: 150,
  Component: ExtraComponent,
}

export default config

function getTagNameByFile(file: File) {
  switch (true) {
    case file.type.indexOf('image') !== -1:
      return 'img'
    case file.type.indexOf('video') !== -1:
      return 'video'
    case file.type.indexOf('audio') !== -1:
      return 'audio'
    default:
      return 'upload'
  }
}
