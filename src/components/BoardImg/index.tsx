import React from 'react'
import cn from 'classnames'
import { IMAGE_BASE_PATH } from 'src/constants/path'
import s from './index.m.scss'

type IBoardImgProps = Omit<JSX.IntrinsicElements['img'], 'size' | 'onError' | 'board' | 'src'> & {
  board: {
    name: string
  }
  size: number | string
}

const BoardImg: React.FC<IBoardImgProps> = ({ board, style = {}, size, className, ...rest }) => (
  <img
    {...rest}
    className={cn(s.img, className)}
    src={`${IMAGE_BASE_PATH}/board/_${board.name}.png`}
    onError={e => {
      if ((e.target as HTMLImageElement).src === `${IMAGE_BASE_PATH}/board/_CC98.png`) return
      e.preventDefault()
      ;(e.target as HTMLImageElement).src = `${IMAGE_BASE_PATH}/board/_CC98.png`
    }}
    style={{
      ...style,
      width: size,
      height: size,
    }}
  />
)

export default BoardImg
