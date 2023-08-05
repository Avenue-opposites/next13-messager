'use client'

import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import Button from '~/app/components/Button'
import Modal from '~/app/components/Modal'
import Input from '~/app/components/inputs/Input'
import Select from '~/app/components/inputs/Select'

type FormValue = {
  name: string;
  members: Readonly<Record<string, any>[]>
} & FieldValues

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[]
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
  isOpen = false,
  onClose,
  users
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors
    }
  } = useForm<FormValue>({
    defaultValues: {
      name: '',
      members: []
    }
  })

  const members = watch('members')
  const onSubmit: SubmitHandler<FormValue> = (data) => {
    setIsLoading(true)

    axios.post('/api/conversations', {
      ...data,
      isGroup: true
    })
      .then(() => {
        router.refresh()
        onClose()
      })
      .catch(() => toast.error('出现了某些错误！'))
      .finally(() => setIsLoading(false))
  }
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2
              className="
                text-base font-semibold
                leading-7 text-gray-900
              "
            >
              Create a group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Create a chat with more than 2 people.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label="Name"
                name="name"
                errors={errors}
                required
                register={register}
              />
              <Select
                disabled={isLoading}
                label="Members"
                onChange={(value) =>
                  setValue('members', value, { shouldValidate: true })
                }
                options={users.map(user => ({
                  value: user.id,
                  label: user.name
                }))}
                value={members}
              />
            </div>
          </div>
        </div>
        <div
          className="
            mt-6 flex justify-end items-center
            gap-x-6 
          "
        >
          <Button disabled={isLoading} type="submit">Create</Button>
          <Button disabled={isLoading} onClick={onClose} variant="secondary">Cancel</Button>
        </div>
      </form>
    </Modal>
  );
}

export default GroupChatModal;