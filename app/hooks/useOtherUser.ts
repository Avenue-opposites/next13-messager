import { useSession } from 'next-auth/react'
import { useMemo } from 'react'

import { FullConversationType } from '~/types'
import { User } from '@prisma/client'

export default function useOtherUser(
  conversation: FullConversationType | { users: User[] }
) {
  const session = useSession()
  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email
    return conversation.users.filter(user => user.email !== currentUserEmail)[0]
  }, [conversation.users, session.data?.user?.email])

  return otherUser
}