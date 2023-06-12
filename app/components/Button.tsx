'use client'

import clsx from 'clsx'

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const variantClasses = {
  primary: `
    text-white
    bg-primary
    hover:bg-secondary
    focus:visible:outline-sky-600
  `,
  secondary: `
    text-gray-700
    bg-gray-100
    hover:bg-gray-200
    focus:visible:outline-gray-300
  `,
  danger: `
    text-white
    bg-rose-500
    hover:bg-rose-700
    focus:visible:outline-rose-600
  `,
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  children,
  onClick,
}) => {
  return (
    <button
      className={clsx(`
        flex justify-center
        px-3 py-2
        text-sm
        rounded-md
        font-semibold
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
        transition-colors
      `,
      disabled && 'disabled',
      fullWidth && 'w-full',
      variantClasses[variant]
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >{children}</button>
  )
}

export default Button