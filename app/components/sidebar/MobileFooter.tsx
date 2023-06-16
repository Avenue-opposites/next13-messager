'use client'
import { User } from '@prisma/client'
import useConversation from '~/app/hooks/useConversation'
import useRoutes from '~/app/hooks/useRoutes'

import MobileItem from './MobileItem'

interface MobileFooterProps {
  user: User
}

// 移动端底部导航栏
const MobileFooter: React.FC<MobileFooterProps> = () => {
  const routes = useRoutes()
  const { isOpen } = useConversation()

  if (isOpen) 
    return null

  return (
    <div 
      className="
        fixed bottom-0
        flex justify-between items-center
        bg-white
        border-t-[1px] 
        w-full 
        z-40
        lg:hidden
      "
    >
      {routes.map((route) => <MobileItem key={route.label} {...route} />)}
    </div>
  )
}

export default MobileFooter