'use client'

import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm, FieldValues, UseFormRegister } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import Modal from '../Modal'
import Input from '../inputs/Input'
import Image from 'next/image'
import { CldUploadButton } from 'next-cloudinary'
import Button from '../Button'

type FromData = {
  image: string | null;
  name: string | null;
} & FieldValues

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User  
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen = false,
  onClose,
  currentUser
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
  } = useForm<FromData>({
    defaultValues: {
      name: currentUser.name,
      image: currentUser.image
    }
  })

  const image = watch('image')
  const handleUpload = (result: any) => {
    setValue('image', result?.info?.secure_url, {
      shouldValidate: true
    })
  }

  const onSubmit: SubmitHandler<FromData> = (data) => {
    setIsLoading(true)

    axios.post('api/settings', data)
    .then(() => {
      router.refresh()
      onClose()
    })
    .catch(() => toast.error('发生了某些错误！设置失败.'))
    .finally(() => setIsLoading(false))
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2
              className="
                text-base font-semibold
                leading-7 text-gray-900
              "
            >
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Edit you public information.
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
              <div>
                <label
                  className="
                    block text-sm font-medium
                    leading-6 text-gray-900
                  "
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image 
                    width={48}
                    height={48}
                    className="rounded-full"
                    src={image || currentUser?.image || '/images/placeholder.jpg'}
                    alt="Avatar"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="tvqempvu"
                  >
                    <Button
                      disabled={isLoading}
                      variant="secondary"
                    >
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div
            className="
              mt-6 flex items-center justify-end
              gap-x-6
            "
          >
            <Button
              type="submit"
              disabled={isLoading}
              variant="primary"
            >
              Save
            </Button>
            <Button
              disabled={isLoading}
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
 
export default SettingsModal;