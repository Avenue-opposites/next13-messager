import { Message, User, Conversation } from '@prisma/client'

export * from './Form'

export type FullMessageType = Message & {
  sender: User
  seenBy: User[]
}

export type FullConversationType = Conversation & {
  users: User[]
  messages: FullMessageType[]
}