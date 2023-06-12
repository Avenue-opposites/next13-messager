import './globals.css'
import localFont from 'next/font/local'
import ToasterContext from './context/ToasterContext'

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
        {children}
      </body>
    </html>
  )
}