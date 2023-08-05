import { NextResponse } from 'next/server'
import getCurrentUser from '~/app/actions/getCurrentUser';
import prisma from '~/app/libs/prismadb';
import { pusherServer } from '~/app/libs/pusher';

interface Params {
  conversationId?: string
}

export async function POST(
  _: Request,
  { params }: { params: Params }
) {
  try {
    const currentUser = await getCurrentUser()
    const { conversationId } = params
    
    if(!(currentUser?.id || currentUser?.email)) {
      return new NextResponse('unauthorized', { status: 401 })
    }

    //获取会话
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        messages: {
          include: {
            seenBy: true
          }
        },
        users: true
      }
    })
    //会话不存在
    if(!conversation) {
      return new NextResponse('Invalid ID', { status: 400 })
    }
    //最后的信息
    const lastMessage = conversation.messages[conversation.messages.length - 1]
    //如果没有就返回会话
    if(!lastMessage) {
      return NextResponse.json(conversation)
    }
    //否则更新信息
    const updateMessage = await prisma.message.update({
      where: {
        id: lastMessage.id
      },
      include: {
        sender: true,
        seenBy: true
      },
      data: {
        seenBy: {
          connect: {
            id: currentUser.id
          }
        }
      }
    })

    await pusherServer.trigger(currentUser.email!, 'conversation:update', {
      id: conversationId,
      messages: [updateMessage]
    })

    //最后一条消息被当前用户看过
    if(lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation)
    }

    await pusherServer.trigger(conversationId!, 'message:update', updateMessage)

    return NextResponse.json(lastMessage)
  } catch(error) {
    console.log(error, 'ERROR_MESSAGE_SEENBY');
    return new NextResponse('Internal Error', { status: 500 })
  }
}