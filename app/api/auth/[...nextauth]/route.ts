import bcrypt from 'bcrypt';
import NextAuth, { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import prisma from '~/app/libs/prismadb'

// 验证配置
export const authOptions: AuthOptions = {
  // 适配器
  adapter: PrismaAdapter(prisma),
  // 供应商
  providers: [
    // Github
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      /*
        如果使用加速器的话可能会出现以下错误
        Error: unable to verify the first certificate
        不使用加速器可能请求会超时,默认为3500ms,所以修改超时时间为30s
      */
      httpOptions: {
        timeout: 30000,
      },
    }),
    // Google
    Google({
      // 需要在Google Cloud Platform中配置OAuth2.0客户端ID
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    // 凭证
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      // 授权
      async authorize(credentials) {
        const { email, password } = credentials || {}

        // 验证
        if(!email || !password) {
          throw new Error("Invalid Credentials");
        }
        
        // 查询用户
        const user = await prisma.user.findUnique({
          where: { email }
        })

        // 验证用户,如果用户不存在或者哈希密码不存在,则抛出错误
        if(!user?.hashedPassword) {
          throw new Error("Invalid Credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          password, 
          user.hashedPassword
        )

        // 验证密码,如果密码不正确,则抛出错误
        if(!isCorrectPassword) {
          throw new Error("Invalid Credentials");
        }

        return user
      }
    })
  ],
  // debug: process.env.NODE_ENV === 'development',
  debug: false,
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  logger: {
    error(code, metadata) {
      console.log("错误代码",code);
      console.log("元数据",metadata);
    },
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }