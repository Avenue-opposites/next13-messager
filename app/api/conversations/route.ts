import { NextResponse } from "next/server";

import prisma from "~/app/libs/prismadb";
import getCurrentUser from "~/app/actions/getCurrentUser";
import { pusherServer } from "~/app/libs/pusher";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    const body = await request.json()
    const { userId, isGroup, members, name } = body

    // 如果没有用户id或者用户邮箱，返回401
    if(!currentUser?.id || !currentUser.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // 如果没有群组名，返回400
    if(!name) {
      return new NextResponse('Name is required', { status: 400 })
    }

    // 如果是群组，但是没有群组成员或者群组成员少于2人，返回400
    if(isGroup && (!members || members.length < 2)) {
      return new NextResponse('Group must have at least 2 members', { status: 400 })
    }

    if(isGroup) {
      // 新建群组
      const conversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            // 连接群组成员
            connect: [
              ...members.map((member: { value: string }) => ({ 
                id: member.value
              })),
              {
                id: currentUser.id
              }
            ]
          }
        },
        include: {
          users: true
        }
      })

      conversation.users.map(user => {
        if(user.email) {
          pusherServer.trigger(user.email, 'conversation:new', conversation)
        }
      })

      return NextResponse.json(conversation)
    }

    // 查找现有会话
    const existingConversation = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId]
            }
          },
          {
            userIds: {
              equals: [userId, currentUser.id]
            }
          }
        ]
      }
    })

    // 单独会话
    const singleConversation = existingConversation[0]

    // 如果没有单独会话，新建单独会话
    if(!singleConversation) {
      const conversation = await prisma.conversation.create({
        data: {
          name,
          isGroup: false,
          users: {
            // 连接会话成员
            connect: [
              { id: currentUser.id },
              { id: userId },
            ]
          }
        },
        // 如果需要返回会话成员，可以使用include
        include: {
          users: true
        }
      })

      conversation.users.map(user => {
        if(user.email) {
          // 推送新创建的会话
          pusherServer.trigger(user.email, 'conversation:new', conversation)
        }
      })

      return NextResponse.json(conversation)
    }

    return NextResponse.json(singleConversation)
  }catch(e) {
    return new NextResponse('Internal Conversations Error', { status: 500 })
  }
}