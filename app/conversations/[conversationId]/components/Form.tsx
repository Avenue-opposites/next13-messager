'use client'
import axios from 'axios'
import { CldUploadButton } from 'next-cloudinary'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2'

import useConversation from '~/app/hooks/useConversation'
import MessageInput from './MessageInput'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export type FormProps = {
  message: string;
} & FieldValues

const Form = () => {
  const router = useRouter()
  const { conversationId } = useConversation()
  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors
    }
  } = useForm<FormProps>({
    defaultValues: {
      message: ''
    }
  })

  const onSubmit: SubmitHandler<FormProps> = (data) => {
    setValue('message', '', { shouldValidate: true })

    axios.post('/api/messages', {
      ...data,
      conversationId
    })
      .catch(() => toast.error("发送失败, 连接服务器出错!"))
  }

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId
    })
      .catch(() => toast.error("发送失败, 连接服务器出错!"))

  }
  return (
    <div
      className="
        py-4 px-4
        bg-white
        border-t
        flex items-center gap-2
        lg:gap-4
        w-full
      "
    >
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="tvqempvu"
      >
        <HiPhoto
          size={30}
          className="
            text-sky-500 
            hover:text-sky-600
            transition-colors
          "
        />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="
            rounded-full 
            p-2
            bg-sky-500
            hover:bg-sky-600
            transition-colors
            cursor-pointer
          "
        >
          <HiPaperAirplane
            size={18}
            className="text-white"
          />
        </button>
      </form>
    </div>
  )
}

export default Form