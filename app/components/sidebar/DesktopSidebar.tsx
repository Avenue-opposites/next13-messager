'use client'
import { User } from "@prisma/client"
import { Fragment, useState } from "react"

import useRoutes from "~/app/hooks/useRoutes"
import Avatar from "../Avatar"
import DesktopItem from "./DesktopItem"
import SettingsModal from "./SettingsModal"

interface DesktopSidebarProps {
  user: User
}
// 桌面侧边栏
const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  user
}) => {
  const routes = useRoutes()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Fragment>
      <SettingsModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        currentUser={user}
      />
      <div 
        className="
          hidden
          py-4
          lg:fixed
          lg:left-0
          lg:inset-0
          lg:z-40
          lg:w-20
          lg:overflow-y-auto
          lg:bg-white
          lg:border-r-[1px]
          lg:pd-4
          lg:flex lg:flex-col justify-between
          xl:px-6
        "
      >
        <nav className="flex flex-col justify-between">
          <ul 
            role="list" 
            className="
              flex flex-col items-center 
              space-y-1
            "
          >
            {routes.map((route) => <DesktopItem key={route.label} {...route} />)}
          </ul>
        </nav>
        <nav 
          className="
            mt-4
            flex flex-col justify-between items-center
          "
        >
          <div 
            className="
              cursor-pointer
              hover:opacity-75
              transition-opacity
            "
            onClick={() => setIsOpen(true)}
          >
            <Avatar user={user} />
          </div>
        </nav>
      </div>
    </Fragment>
  )
}

export default DesktopSidebar