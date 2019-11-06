import React from 'react'
import ReactCrop from 'react-image-crop'
import { useDispatch } from 'react-redux'
import { IUser } from '@cc98/api'
import Button from 'src/components/Button'
import { IMAGE_BASE_PATH } from 'src/constants/path'
import { changeAvatar } from 'src/service/user'
import notice from 'src/utils/notice'
import { refreshUserInfo } from 'src/store/global-async-actions'
import { uploadFile } from 'src/service/file'

import s from './ConfigAvatar.m.scss'

interface IConfigAvatarProps {
  user: IUser
}

const DEFAULT_AVATARS = [
  'default_avatar_boy.png',
  'default_avatar_girl.png',
  'default_avatar_boy2.jpg',
  'default_avatar_girl2.jpg',
  'default_avatar_boy3.jpg',
  'default_avatar_girl3.jpg',
]

const getCroppedImg = (image: HTMLImageElement, crop: ReactCrop.Crop) => {
  const canvas = document.createElement('canvas')
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  canvas.width = crop.width!
  canvas.height = crop.height!
  const ctx = canvas.getContext('2d')

  ctx!.drawImage(
    image,
    crop.x! * scaleX,
    crop.y! * scaleY,
    crop.width! * scaleX,
    crop.height! * scaleY,
    0,
    0,
    crop.width!,
    crop.height!
  )

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (!blob) {
        reject(new Error('Canvas is empty'))

        return
      }
      resolve(blob)
    }, 'image/png')
  }) as Promise<Blob>
}

const ConfigAvatar: React.FC<IConfigAvatarProps> = ({ user }) => {
  const input = React.useRef<HTMLInputElement>(null)
  const image = React.useRef<HTMLImageElement>()
  const dispatch = useDispatch()
  const [isDefaultShown, setIsDefaultShown] = React.useState(false)
  const [localFileSrc, setLocalFileSrc] = React.useState<string | null>(null)
  const [crop, setCrop] = React.useState<ReactCrop.Crop>({
    unit: 'px',
    width: 30,
    height: 30,
    x: 0,
    y: 0,
    aspect: 1 / 1,
  })

  const handleDefaultClick = () => {
    setIsDefaultShown(v => !v)
    setLocalFileSrc(null)
  }

  const handleSetAvatar = (url: string) => {
    changeAvatar(url).then(() => {
      setIsDefaultShown(false)
      setLocalFileSrc(null)
      notice('修改成功')
      dispatch(refreshUserInfo())
    })
  }

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setIsDefaultShown(false)
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setLocalFileSrc(reader.result as string)

        if (input.current) {
          input.current.value = ''
        }
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleLocalSubmit = async () => {
    if (!image.current) return

    const file = ((await getCroppedImg(image.current, crop)) as any) as File
    const [result] = await uploadFile(file)

    handleSetAvatar(result)
  }

  return (
    <div>
      <div className={s.container}>
        <img src={user.portraitUrl} />
        <div className={s.buttons}>
          <Button onClick={handleDefaultClick}>选择论坛头像</Button>
          <Button onClick={() => input.current && input.current.click()}>选择本地图片</Button>
          {!!localFileSrc && (
            <Button primary onClick={handleLocalSubmit}>
              提交
            </Button>
          )}
          <input
            ref={input}
            type="file"
            style={{ display: 'none' }}
            onChange={handleInputChange}
            accept="image/*"
          />
        </div>
      </div>
      {isDefaultShown && (
        <div className={s.defaultAvatar}>
          {DEFAULT_AVATARS.map(name => (
            <img
              onClick={e => handleSetAvatar((e.target as HTMLImageElement).src)}
              src={`${IMAGE_BASE_PATH}/${name}`}
            />
          ))}
        </div>
      )}
      {!!localFileSrc && (
        <ReactCrop
          src={localFileSrc}
          crop={crop}
          onChange={setCrop}
          onImageLoaded={it => {
            image.current = it
          }}
        />
      )}
    </div>
  )
}

export default ConfigAvatar
