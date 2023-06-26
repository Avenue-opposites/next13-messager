'use client'
import Link from 'next/link'
import { useMemo } from 'react'
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2'
import Avatar from '~/app/components/Avatar'

import useOtherUser from '~/app/hooks/useOtherUser'
import { FullConversationType } from '~/types'

interface HeaderProps {
  conversation: Omit<FullConversationType, 'messages'>
}

const Header:React.FC<HeaderProps> = ({
  conversation
}) => {
  const otherUser = useOtherUser(conversation)
  const statusText = useMemo(() => {
    if(conversation.isGroup) {
      return `${conversation.users.length} members`
    } 

    return 'Active'
  },[conversation])
  return (
    <div 
      className="
        bg-white
        w-full
        flex justify-between items-center
        border-b-[1px]
        py-3 px-4
        sm:px-4
        lg:px-6
        shadow-sm
      "
    >
      <div className="flex gap-3 items-center">
        <Link 
          href="/conversation"
          className="
            block
            text-sky-500
            hover:text-sky-600
            transition-colors
            cursor-pointer
            lg:hidden
          "
        >
          <HiChevronLeft size={32} />
        </Link>
        <Avatar user={otherUser} />
        <div className="flex flex-col">
          <div>
            {conversation.name || otherUser.name}
          </div>
          <div className="text-sm font-light  text-neutral-500">
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal 
        size={32} 
        className="
          text-sky-500 
          cursor-pointer 
          hover:text-sky-600 
          transition-colors
          "
      />
    </div>
  )
}

export default Header