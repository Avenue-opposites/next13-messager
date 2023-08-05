import clsx from 'clsx'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Avatar from '~/app/components/Avatar'
import { FullMessageType } from '~/types'

interface MessageBoxProps {
    data: FullMessageType;
    isLast: boolean;
    onClickImage: (image: string) => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({
    data,
    isLast,
    onClickImage
}) => {
    const session = useSession()
    //当前用户是否为这条信息的发送人
    const isOwn = session.data?.user?.email === data.sender.email
    const seenByList = (data.seenBy || [])
    //获取看过这条信息(除了发送人)的用户
    .filter(user => user.email !== data.sender.email)
    //获取获取他们的用户名
    .map(user => user.name)
    //拼接
    .join(' ,')
    
    const container = clsx(
        'flex gap-4 p-4',
        isOwn && 'justify-end'
    )

    const avatar = clsx(
        isOwn && 'order-2'
    )

    const body = clsx(
        'flex flex-col gap-2',
        isOwn && 'items-end'
    )

    const message = clsx(
        'rounded-md text-sm w-fit overflow-hidden',
        isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
        data.image ? 'p-0' : 'py-2 px-3'
    )
    
    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar user={data.sender} />
            </div>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">
                        {data.sender.name}
                    </div>
                    <div className="text-xs text-gray-400">
                        {format(new Date(data.createdAt),'p')}
                    </div>
                </div>
                <div className={message}>
                    {
                        data.image ? 
                        <Image
                        onClick={() => onClickImage(data.image!)}
                        width={288}
                        height={288}
                        src={data.image}
                        alt="Image"
                        className="
                            object-cover 
                            cursor-pointer
                            hover:scale-110
                            transition
                        "
                        />
                        : data.body
                    }
                </div>
                {
                    isLast && isOwn && seenByList.length > 0 && (
                        <div>
                            seen by {seenByList}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default MessageBox