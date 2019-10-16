import React from 'react'
import cn from 'classnames'
import { BaseValueType, ValueType } from './types'
import s from './index.m.scss'

interface ISelectPopProps {
  popWidth: number
  popoverClassName?: string
  itemClassName?: string
  innerData: { value: BaseValueType; label: string }[]
  value: ValueType
  onChange: (value: ValueType) => void
  setVisible: (visible: boolean) => void
}

const SelectPop = React.forwardRef<HTMLDivElement, ISelectPopProps>(
  ({ popoverClassName, popWidth, innerData, onChange, value, itemClassName, setVisible }, pop) => {
    return (
      <div
        ref={pop}
        style={{ width: popWidth }}
        className={cn(s.popoverContainer, popoverClassName)}
      >
        {innerData.map(item => {
          const isCurrentSelected = Array.isArray(value)
            ? value.includes(item.value)
            : value === item.value

          return (
            <div
              className={cn(
                s.item,
                {
                  [s.current]: isCurrentSelected,
                },
                itemClassName
              )}
              key={item.value}
              onClick={() => {
                if (Array.isArray(value)) {
                  // WTF
                  onChange(
                    isCurrentSelected ? value.filter(v => v !== item.value) : [...value, item.value]
                  )
                } else {
                  onChange(item.value)
                  setVisible(false)
                }
              }}
            >
              {item.label}
            </div>
          )
        })}
      </div>
    )
  }
)

export default SelectPop
