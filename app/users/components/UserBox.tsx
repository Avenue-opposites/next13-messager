'use client'
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Fragment, useCallback, useState } from 'react'
import Avatar from '~/app/components/Avatar'
import LoadingModal from '~/app/components/LoadingModal'

interface UserBoxProps {
  data: User
}

const UserBox: React.FC<UserBoxProps> = ({
  data
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const handleClick = useCallback(() => {
    setIsLoading(true)
    // 请求会话
    axios.post('/api/conversations', {
      name: data.name,
      members: [data.id],
      isGroup: false,
      userId: data.id,
    })
      // 当请求成功后，跳转到会话页面
      .then((response) => {
        // console.log(response);
        router.push(`/conversations/${response.data.id}`)
      })
      .finally(() => setIsLoading(false))
  }, [router, data])

  return (
    <Fragment>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="
          w-full
          relative
          flex items-center
          space-x-3
          bg-white
          hover:bg-neutral-100
          p-3
          rounded-lg
          transition-colors
          cursor-pointer
        "
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div
              className="
                flex justify-between items-center
                mb-1
              "
            >
              <p
                className="
                  text-sm
                  font-medium
                  text-gray-900
                "
              >
                {data.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default UserBox