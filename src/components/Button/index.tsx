import React from 'react'
import cn from 'classnames'

import s from './index.m.scss'

type HTMLButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export interface IButtonProps extends HTMLButtonProps {
  primary?: boolean
  border?: boolean
}

const Button: React.FC<IButtonProps> = ({
  className,
  disabled,
  primary = false,
  border = false,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={cn(className, s.base, {
        [s.primary]: primary,
        [s.border]: border,
      })}
      disabled={disabled}
      {...rest}
    />
  )
}

export default Button
