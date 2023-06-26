import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
// import { User, Message, Conversation } from '@prisma/client'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'

import { FullConversationType } from '~/types'
import useOtherUser from '~/app/hooks/useOtherUser'
import Avatar from '~/app/components/Avatar'

interface ConversationBoxProps {
  data: FullConversationType,
  selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected = false
}) => {
  const OtherUser = useOtherUser(data)
  const session = useSession()
  const router = useRouter()

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`)
  }, [data.id, router])

  // 最后一条消息
  const lastMessage = useMemo(() => {
    const messages = data.messages || []
    return messages[messages.length - 1]
  },[data.messages])

  // 用户邮箱
  const userEmail = useMemo(() => {
    return session?.data?.user?.email
  }, [session?.data?.user?.email])

  // 是否已读
  const hasSeen = useMemo(() => {
    // 如果没有最后一条消息，返回false
    if(!lastMessage) 
      return false

    // 如果没有seenBy字段，返回false
    const seenBy = lastMessage?.seenBy || []
    // 如果没有用户邮箱，返回false
    if(!userEmail)
      return false
    
    return seenBy.some((user) => user.email === userEmail)
  },[lastMessage, userEmail])

  const lastMessageText = useMemo(() => {
    if(lastMessage?.image)
      return 'Sent an image'

    if(lastMessage?.body) 
      return lastMessage.body

    return 'Started a conversation'
  },[lastMessage])

  
  return (
    <div 
      onClick={handleClick}
      className={clsx(`
        w-full
        relative
        flex items-center
        space-x-3
        hover:bg-neutral-100
        rounded-lg
        transition-colors
        cursor-pointer
        p-3
      `,
        selected ? 'bg-neutral-100' : 'bg-white'
      )}
    >
      <Avatar user={OtherUser} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div 
            className="
              flex justify-between items-center
              mb-1
            "
          >
            <p className="text-md font-medium text-gray-900">
              {data.name || OtherUser.name}
            </p>
            {
              lastMessage?.createdAt && (
                <p className="text-xs text-gray-400 font-light">
                  {format(new Date(lastMessage.createdAt), 'p')}
                </p>
              )
            }
          </div>
          <p 
            className={clsx(`
              truncate
              text-sm
            `,
              hasSeen ? 'text-gray-500' : 'text-black font-medium'
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ConversationBox