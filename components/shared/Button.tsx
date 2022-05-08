import React, { FC } from 'react';
import { type IconType } from 'react-icons';
import s from './Button.module.scss';
import clsx from 'clsx';

type ButtonProps = {
  variant?: 'brand' | 'secondary';
  size?: 'small';
  leftIcon?: IconType;
  rightIcon?: IconType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: string;
  className?: string;
};

const Button: FC<ButtonProps> = ({ className, variant, leftIcon, rightIcon, onClick, size, children }) => {
  const LeftIcon = (leftIcon ? leftIcon : null) as React.ElementType;
  const RightIcon = (rightIcon ? rightIcon : null) as React.ElementType;

  return (
    <button
      className={clsx(s.button, variant && s[`button--${variant}`], size && s[`button--${size}`], className)}
      role='button'
      onClick={onClick}
    >
      {leftIcon ? <LeftIcon className={s['button__left-icon']} /> : null}
      {children}
      {rightIcon ? <RightIcon className={s['button__right-icon']} /> : null}
    </button>
  );
};

export default Button;
