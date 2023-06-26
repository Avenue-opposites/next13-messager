import { User } from "@prisma/client"
import Image from "next/image"

interface AvatarProps {
  user?: User
}

// 头像组件
const Avatar: React.FC<AvatarProps> = ({
  user
}) => {
  return (
    <div className="relative h-9 w-9 md:h-11 md:w-11">
      <div 
        className="
          relative 
          inline-block
          rounded-full
          overflow-hidden
          w-full h-full
        "
      >
        <Image 
          src={user?.image || '/images/placeholder.jpg'} 
          alt="Avatar" fill
        />
      </div>
      {/* 表示用户是否活跃的绿点 */}
      <span 
        className="
          absolute
          block
          rounded-full
        bg-green-500
          ring-2 ring-white
          top-0 right-0
          md:w-3 md:h-3
        "
      />
    </div>
  )
}

export default Avatar