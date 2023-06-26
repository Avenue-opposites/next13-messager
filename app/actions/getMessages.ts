import prisma from '~/app/libs/prismadb'

export default async function getMessages(
  conversationId: string
) {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId
      },
      // 按照创建时间升序排列
      orderBy: {
        createdAt: 'asc'
      },
      include: {
        sender: true,
        seenBy: true
      }
    })

    return messages
  } catch(e) {
    console.warn(e)
    return []
  }
}