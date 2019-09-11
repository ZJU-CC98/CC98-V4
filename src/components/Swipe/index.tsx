import React from 'react'
import cn from 'classnames'

import s from './index.m.scss'

interface ISwipeProps {
  autoplay?: boolean
  duration?: number
  dotPosition?: 'center' | 'right'
  showDot?: boolean
  className?: string
  initValue?: number
}

const Swipe: React.FC<ISwipeProps> = ({
  children,
  className,
  autoplay = false,
  dotPosition = 'center',
  showDot = true,
  initValue = 0,
  duration = 2000,
}) => {
  const [current, setCurrent] = React.useState(initValue)

  React.useEffect(() => {
    if (autoplay) {
      const timer = setTimeout(() => {
        setCurrent(current + 1)
      }, duration)

      return () => {
        clearTimeout(timer)
      }
    }
  })

  return (
    <div className={cn(s.root, className)}>
      {React.Children.toArray(children).filter(
        (_, index) => current % (React.Children.count(children) || 1) === index
      )[0] || null}
      {showDot && (
        <div
          className={cn(s.dots, {
            [s.center]: dotPosition === 'center',
            [s.right]: dotPosition === 'right',
          })}
        >
          {React.Children.toArray(children).map((_, index) => (
            <div
              className={cn(s.dot, {
                [s.current]: current % (React.Children.count(children) || 1) === index,
              })}
              /* eslint-disable-next-line react/no-array-index-key */
              key={index}
              onMouseEnter={() => setCurrent(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Swipe
