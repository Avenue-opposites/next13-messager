import prisma from '~/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'

// 根据会话ID获取会话
export default async function getConversationById(
  conversationId: string
) {
  try {
    // 获取当前用户
    const currentUser = await getCurrentUser()
    // 如果当前用户不存在或者当前用户的邮箱不存在
    if (!currentUser?.email) {
      return null
    }

    // 获取会话
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true
      }
    })

    return conversation
  }catch(e) {
    console.warn(e)
    return null
  }
}