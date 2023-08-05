import { User } from '@prisma/client'
import Image from 'next/image'

interface AvatarGroup {
  users: User[]
}

const AvatarGroup: React.FC<AvatarGroup> = ({
  users
}) => {
  const slicedUsers = users.slice(0, 3)
  const classes = [
    'top-0 left-[12px]',
    'bottom-0',
    'bottom-0 right- 0'
  ]

  return (
    <div className="w-11 h-11 relative">
      {
        slicedUsers.map((user, i) => (
          <div
            key={user.id}
            className={`
              absolute inline-block
              rounded-full overflow-hidden
              h-[21px] w-[21px]
              ${classes[i]}
            `}
          >
            <Image
              src={user.image || '/images/placeholder.jpg'}
              fill
              alt="Avatar"
            />
          </div>
        ))
      }
    </div>
  );
}

export default AvatarGroup;