'use client'
import { useRouter } from 'next/navigation'
import { MdOutlineGroupAdd } from 'react-icons/md'
import { Fragment, useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'

import useConversation from '~/app/hooks/useConversation'
import { FullConversationType } from '~/types'
import ConversationBox from './ConversationBox'
import GroupChatModal from './GroupChatModal'
import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { pusherClient } from '~/app/libs/pusher'
import { find } from 'lodash'

interface ConversationListProps {
  users: User[];
  initialItems: FullConversationType[];
}
// 会话列表组件
const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  users
}) => {
  const session = useSession()
  const [items, setItems] = useState(initialItems)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()
  const { conversationId, isOpen } = useConversation()

  const pusherKey = useMemo(() => session.data?.user?.email, [session.data?.user?.email])

  useEffect(() => {
    if (!pusherKey) return

    pusherClient.subscribe(pusherKey)

    const conversationHandler = (newConversation: FullConversationType) => {
      setItems(current => {
        if (find(current, { id: newConversation.id })) {
          return current
        }

        return [newConversation, ...current]
      })
    }
    const removeConversationHandler = (removedConversation: FullConversationType) => {
      setItems(current => current.filter(conversation => conversation.id !== removedConversation.id))

      if (conversationId === removedConversation.id) {
        router.push('/conversations')
      }
    }

    const updateConversationHandler = (updatedConversation: FullConversationType) => {
      setItems(current => current.map(conversation => {
        if (conversation.id === updatedConversation.id) {
          return {
            ...conversation,
            messages: updatedConversation.messages
          }
        }

        return conversation
      }))
    }

    pusherClient.bind('conversation:update', updateConversationHandler)
    pusherClient.bind('conversation:new', conversationHandler)
    pusherClient.bind('conversation:remove', removeConversationHandler)

    return () => {
      pusherClient.unsubscribe(pusherKey)
      pusherClient.unbind('conversation:new', conversationHandler)
      pusherClient.unbind('conversation:update')
      pusherClient.unbind('conversation:remove', removeConversationHandler)
    }
  }, [pusherKey])

  return (
    <Fragment>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(`
            fixed
            inset-0
            pb-20
            lg:pb-0
            lg:left-20
            lg:w-80
            overflow-y-auto
            border-r
          border-gray-200
          `,
          isOpen ? 'left-0 hidden lg:block' : 'block'
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <h2 className="text-2xl font-bold text-neutral-800">
              Messages
            </h2>
            <div
              className="
                rounded-full
                p-2
                bg-gray-100
                text-gray-600
                cursor-pointer
                hover:opacity-75
                transition-colors
              "
              onClick={() => setIsModalOpen(true)}
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            {items.map((item) =>
              <ConversationBox
                key={item.id}
                data={item}
                selected={item.id === conversationId}
              />
            )}
          </div>
        </div>
      </aside>
    </Fragment>
  )
}

export default ConversationList