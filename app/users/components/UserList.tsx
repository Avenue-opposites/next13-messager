import { User } from "@prisma/client"

import UserBox from "./UserBox"

interface UserListProps {
  items: User[]
}

const UserList: React.FC<UserListProps> = ({
  items
}) => {

  return (
    <aside
      className="
        fixed 
        inset-0
        pb-20
        overflow-y-auto
        border-r
        border-gray-200
        left-0 
        lg:pb-0
        lg:left-20
        lg:w-80
      "
    >
      <div className="px-5">
        <div className="flex flex-col">
          <div
            className="
              text-2xl
              font-bold text-neutral-800
              py-4
            "
          >
            People
          </div>
          {items.map((item) => <UserBox key={item.id} data={item} />)}
        </div>
      </div>
    </aside>
  )
}

export default UserList