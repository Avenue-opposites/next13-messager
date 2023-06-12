import bcrypt from 'bcrypt'

import prisma from '~/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json()

    if(!email || !name || !password) {
      return new NextResponse('Missing information', { status: 400 })
    }
    // 将密码哈希化
    const hashedPassword = await bcrypt.hash(password, 12)
    
    // 创建用户
    const user = await prisma.user.create({
      data: { email, name, hashedPassword }
    })

    return NextResponse.json(user)
  }catch(error) {
    console.log(error, 'register error');
    return new NextResponse('Internal Error', { status: 500 })
  }
}