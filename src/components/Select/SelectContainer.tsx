import React from 'react'
import cn from 'classnames'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { BaseValueType, ValueType } from './types'
import s from './index.m.scss'

interface ISelectContainerProps {
  setVisible: (visible: boolean) => void
  visible: boolean
  width: number
  showArrow: boolean
  innerData: { value: BaseValueType; label: string }[]
  value: ValueType
  onChange: (v: ValueType) => void
  className?: string

  tags: boolean
  tagValue: string
  setTagValue: (v: string) => void
}

const SelectContainer = React.forwardRef<HTMLDivElement, ISelectContainerProps>(
  (
    {
      visible,
      setVisible,
      width,
      showArrow,
      innerData,
      value,
      className,
      onChange,
      tags,
      tagValue,
      setTagValue,
    },
    container
  ) => {
    const currentData = Array.isArray(value)
      ? value.map(v => {
          const data = innerData.find(item => item.value === v)

          if (data) {
            return data
          }

          return {
            label: v,
            value: v,
          }
        })
      : [innerData.find(item => item.value === value)!]

    const widthOffset = showArrow ? 17 : 22

    const handleTagOk = () => {
      if (!tagValue) return

      onChange(
        // eslint-disable-next-line no-nested-ternary
        Array.isArray(value) ? (value.includes(tagValue) ? value : [...value, tagValue]) : tagValue
      )
      setTagValue('')
      setVisible(false)
    }

    const content = Array.isArray(value)
      ? currentData.map(item => (
          <span className={s.multiItem} key={item.value}>
            {item.label}
            <span
              onClick={e => {
                e.stopPropagation()
                onChange(value.filter(v => v !== item.value))
              }}
            >
              <Icon className={s.icon} icon={faTimes} />
            </span>
          </span>
        ))
      : (currentData[0] || {}).label || ''

    return (
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
        <span className={s.itemContainer}>
          {content}
          {tags && (
            <input
              className={s.input}
              type="text"
              onFocus={() => setVisible(true)}
              onBlur={handleTagOk}
              onKeyPress={e => e.key === 'Enter' && handleTagOk()}
              value={tagValue}
              onClick={e => e.stopPropagation()}
              onChange={e => setTagValue(e.target.value)}
            />
          )}
        </span>
      </div>
    )
  }
)

export default SelectContainer
