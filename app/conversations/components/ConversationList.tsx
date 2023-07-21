'use client'
import { useRouter } from 'next/navigation'
import { MdOutlineGroupAdd } from 'react-icons/md'
import { useState } from 'react'
import clsx from 'clsx'

import useConversation from '~/app/hooks/useConversation'
import { FullConversationType } from '~/types'
import ConversationBox from './ConversationBox'

interface ConversationListProps {
  initialItems: FullConversationType[]
}
// 会话列表组件
const ConversationList: React.FC<ConversationListProps> = ({
  initialItems
}) => {
  const [items, setItems] = useState(initialItems)
  const router = useRouter()
  const { conversationId, isOpen } = useConversation()

  return (
    <aside
      className={clsx(`
          w-0
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
        isOpen ? 'block left-0' : 'hidden'
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
          >
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {items.map((item) => 
          <ConversationBox 
            key={item.id} 
            data={item}
            selected={item.id === conversationId} 
          />
        )}
      </div>
    </aside>
  )
}

export default ConversationList