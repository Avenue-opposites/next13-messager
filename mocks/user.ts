import { User } from '@prisma/client'
import Mock from 'mockjs'

export const userList: User[] = Mock.mock({
  'userList|10': [
    {
      id: '@id',
      name: '@cname',
      email: '@email',
      emailVerified: '@date',
      image: '@image',
      hashedPassword: '@word',
      createdAt: '@date',
      updatedAt: '@date',
    }
  ]
}).userList