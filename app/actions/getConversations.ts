import prisma from '../libs/prismadb'
import getCurrentUser from './getCurrentUser'

export default async function getConversations() {
  const currentUser = await getCurrentUser()

  if(!currentUser?.id) {
    return []
  }
  
  try {
    // 获取当前用户的所有会话
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc'
      },
      where: {
        userIds: {
          has: currentUser.id
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seenBy: true
          }
        }
      }
    })

    if(!conversations.length) {
      return []
    }

    return conversations
  }catch(e) {
    console.warn(e)
    return []
  }
}