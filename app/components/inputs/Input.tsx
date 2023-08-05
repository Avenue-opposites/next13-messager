'use client'
import clsx from 'clsx'
import { 
  FieldErrors,  
  FieldValues,  
  UseFormRegister 
} from 'react-hook-form'
import type { FormDate } from '~/app/(site)/components/AuthForm'

interface InputProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues | any>;
  errors: FieldErrors<FieldValues>;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = 'text',
  required = false,
  register,
  errors,
  disabled = false,
}) => {
  return (
    <div>
      <label 
        className="
          block 
          text-sm 
          font-medium 
          leading-6
          text-gray-900
        "
        htmlFor={name}
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          className={clsx(`
            form-input
            block
            w-full
            rounded-md border-none
            py-1.5
            text-gray-900
            shadow-sm ring-1 ring-inset ring-gray-300
            placeholder:text-gray-400
            focus:ring-2 focus:ring-inset focus:text-sky-600
            sm:text-sm sm:leading-6`,
          errors[name] && 'focus:ring-rose-500',
          disabled && 'disabled' 
          )}
          id={name} 
          type={type}
          autoComplete={name}
          disabled={disabled}
          {...register(name, { required })}
        />
      </div>
    </div>
  )
}

export default Input