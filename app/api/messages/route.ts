import { NextResponse } from 'next/server'
import getCurrentUser from '~/app/actions/getCurrentUser'
import prisma from '~/app/libs/prismadb'
import { pusherServer } from '~/app/libs/pusher'

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    const body = await request.json()
    const { message, image, conversationId } = body
    
    if(!(currentUser?.id || currentUser?.email)) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image,
        conversation: {
          connect: {
            id: conversationId 
          }
        },
        sender: {
          connect: {
            id: currentUser.id
          }
        },
        seenBy: {
          connect: {
            id: currentUser.id
          }
        }
      },
      include: {
        sender: true,
        seenBy: true
      }
    })
    
    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id
          }
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            seenBy: true
          }
        }
      }
    })
    //推送信息新消息
    await pusherServer.trigger(conversationId, 'messages:new', newMessage)
    // 获取最新的一条消息
    const lastMessage = updatedConversation.messages[(updatedConversation.messages.length - 1)]

    updatedConversation.users.map(user => {
      pusherServer.trigger(user.email!, 'conversation:update', {
        id: conversationId,
        messages: [lastMessage]
      })
    })

    return NextResponse.json(newMessage)
  } catch(e) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}