import React from 'react'
import cn from 'classnames'
import Tippy, { TippyProps } from '@tippy.js/react'

import useClickOutside from 'src/hooks/useClickOutside'
import s from './index.m.scss'

interface ISelectProps<T extends string | number> {
  value: T
  onChange: (value: T) => void
  data: { value: T; label: string }[] | string[]
  className?: string
  popoverClassName?: string
  itemClassName?: string
  showArrow?: boolean
  width?: number
  popWidth?: number
  placement?: TippyProps['placement']
  showOffset?: boolean
}

function Select<T extends string | number>({
  value,
  onChange,
  data,
  className,
  popoverClassName,
  itemClassName,
  showArrow = true,
  width = 160,
  popWidth = width,
  placement = 'bottom-start',
  showOffset = true,
}: ISelectProps<T>) {
  const innerData =
    data.length && typeof data[0] === 'string'
      ? (data as string[]).map(label => ({ label, value: label }))
      : (data as { value: string; label: string }[])

  const currentLabel = (innerData.filter(item => item.value === value)[0] || {}).label
  const widthOffset = showArrow ? 17 : 22

  const [visible, setVisible] = React.useState(false)
  const pop = React.useRef<HTMLDivElement>(null)
  const container = React.useRef<HTMLDivElement>(null)

  useClickOutside(() => setVisible(false), pop, container)

  return (
    <Tippy
      className={s.popover}
      duration={0}
      visible={visible}
      onHide={() => setVisible(false)}
      interactive
      offset={showOffset ? '0 0' : '0, -10'}
      placement={placement}
      animation="perspective"
      hideOnClick={false}
      content={
        <div
          ref={pop}
          style={{ width: popWidth }}
          className={cn(s.popoverContainer, popoverClassName)}
        >
          {innerData.map(item => (
            <div
              className={cn(
                s.item,
                {
                  [s.current]: value === item.value,
                },
                itemClassName
              )}
              key={item.value}
              onClick={() => {
                onChange(item.value as T)
                setVisible(false)
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      }
    >
      <div
        ref={container}
        onClick={() => {
          setVisible(!visible)
        }}
        style={{ width: width - widthOffset }}
        className={cn(
          s.container,
          {
            [s.containerArrow]: showArrow,
            [s.active]: visible,
          },
          className
        )}
      >
        <span style={{ flex: 1 }}>{currentLabel}</span>
      </div>
    </Tippy>
  )
}

export default Select
