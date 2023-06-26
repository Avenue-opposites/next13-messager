'use client'
import { UseFormRegister, FieldErrors } from 'react-hook-form'

import { FormProps } from './Form'

interface MessageInputProps {
  id: string;
  type?: string;
  register: UseFormRegister<FormProps>;
  errors: FieldErrors<FormProps>;
  required?: boolean;
  placeholder?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  register,
  errors,
  required = false,
  placeholder = '',
  type = 'text'
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id} 
        type={type}
        autoComplete={id} 
        {...register(id, { required })}
        placeholder={placeholder}
        className="
          text-black
          font-light
          py-2 px-4
          bg-neutral-100
          w-full
          rounded-full
          focus:outline-none
        "
      />
    </div>
  )
}

export default MessageInput