import { getServerSession } from 'next-auth'

import { authOptions } from '../api/auth/[...nextauth]/route'

// 获取session
export default async function getSession() {
  return await getServerSession(authOptions)
}