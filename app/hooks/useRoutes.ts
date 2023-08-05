import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { HiChat } from 'react-icons/hi'
import { HiArrowLeftOnRectangle, HiUser } from 'react-icons/hi2'
import { signOut } from 'next-auth/react'

import useConversation from './useConversation'

export default function useRoutes() {
  const pathname = usePathname()
  const { conversationId } = useConversation()

  const routes = useMemo(() => [
    {
      label: 'Chat',
      href: '/conversations',
      icon: HiChat,
      isActive: pathname === '/conversations' || conversationId
    },
    {
      label: 'Users',
      href: '/users',
      icon: HiUser,
      isActive: pathname === '/users'
    },
    {
      label: 'LogOut',
      href: '#',
      icon: HiArrowLeftOnRectangle,
      onClick: () => signOut()
    }
  ], [pathname, conversationId])

  return routes
}