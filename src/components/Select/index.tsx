import React from 'react'
import Tippy, { TippyProps } from '@tippy.js/react'

import useClickOutside from 'src/hooks/useClickOutside'
import SelectPop from './SelectPop'
import SelectContainer from './SelectContainer'
import { BaseValueType, ValueType } from './types'
import s from './index.m.scss'

interface ISelectProps<T extends BaseValueType, V extends ValueType> {
  value: V
  onChange: (value: V) => void
  data: { value: T; label: string }[] | string[] | number[]
  className?: string
  popoverClassName?: string
  itemClassName?: string
  showArrow?: boolean
  width?: number
  popWidth?: number
  placement?: TippyProps['placement']
  showOffset?: boolean
  tags?: boolean
}

function Select<T extends string | number, V extends T | T[]>({
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
  tags = false,
}: ISelectProps<T, V>) {
  const innerData =
    data.length && (typeof data[0] === 'string' || typeof data[0] === 'number')
      ? (data as (string | number)[]).map(label => ({ label: `${label}`, value: label }))
      : (data as { value: string; label: string }[])

  const innerDataWithTag = [...innerData]

  const [visible, setVisible] = React.useState(false)
  const [tagValue, setTagValue] = React.useState('')

  if (tags && !!tagValue && innerDataWithTag.every(item => item.value !== tagValue)) {
    innerDataWithTag.unshift({ label: tagValue, value: tagValue })
  }

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
      offset={showOffset ? '0, 0' : '0, -10'}
      placement={placement}
      animation="perspective"
      hideOnClick={false}
      content={
        <SelectPop
          ref={pop}
          popWidth={popWidth}
          innerData={innerDataWithTag.filter(item => `${item.value}`.startsWith(`${tagValue}`))}
          setVisible={setVisible}
          onChange={onChange as (v: ValueType) => void}
          value={value}
          itemClassName={itemClassName}
          popoverClassName={popoverClassName}
        />
      }
    >
      <SelectContainer
        ref={container}
        tags={tags}
        tagValue={tagValue}
        setTagValue={setTagValue}
        setVisible={setVisible}
        visible={visible}
        width={width}
        showArrow={showArrow}
        innerData={innerDataWithTag}
        value={value}
        onChange={onChange as (v: ValueType) => void}
        className={className}
      />
    </Tippy>
  )
}

export default Select
