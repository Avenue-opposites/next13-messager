import { withAuth } from 'next-auth/middleware'

export default withAuth({
  // 页面路由
  pages: {
    // 将登录路由设置为根路由
    signIn: '/',
  }
})

export const config = {
  // 匹配器
  matcher: [
    // 匹配users目录下的所有文件为路由
    '/users/:path*',
    '/conversations/:path*'
  ]
}