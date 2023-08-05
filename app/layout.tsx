import './globals.css'
import localFont from 'next/font/local'
import ToasterContext from './context/ToasterContext'
import AuthContext from './context/AuthContext'
import ActiveStatus from './components/ActiveStatus'

export const metadata = {
  title: 'React-messenger',
  description: 'Generated by create next app',
}
// 本地字体
const PingFangBold = localFont({
  src: '../public/fonts/PingFangBold.ttf',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={PingFangBold.className}>
      <body>
        <ToasterContext />
        <ActiveStatus />
        <AuthContext>
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
