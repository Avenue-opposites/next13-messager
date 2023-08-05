'use client'
import { Fragment, useEffect, useRef, useState } from 'react'
import useConversation from '~/app/hooks/useConversation'
import { FullMessageType } from '~/types'
import MessageBox from './MessageBox'
import axios from 'axios'
import ImageModal from './ImageModal'
import { pusherClient } from '~/app/libs/pusher'
import { find } from 'lodash'
interface BodyProps {
  initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({
  initialMessages
}) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const imageRef = useRef('')
  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)
  const { conversationId } = useConversation()

  const onClickImage = (image: string) => {
    imageRef.current = image
    setIsImageModalOpen(true)
  }

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    axios.post(`api/conversations/${conversationId}/seen`)
  }, [conversationId])

  useEffect(() => {
    pusherClient.subscribe(conversationId)
    scrollToBottom()

    const messageHandler = (message: FullMessageType) => {
      setMessages(current => {
        if (find(current, { id: message.id })) {
          return current
        }

        return [...current, message]
      })
      scrollToBottom()
    }
    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages(current => current.map(message => {
        if (message.id === newMessage.id) {
          return newMessage
        }

        return message
      }))
      scrollToBottom()
    }

    pusherClient.bind('messages:new', messageHandler)
    pusherClient.bind('message:update', updateMessageHandler)
    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new', messageHandler)
      pusherClient.unbind('messages:update', updateMessageHandler)
    }
  }, [conversationId])

  return (
    <Fragment>
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        image={imageRef.current}
      />
      <div className="flex-1 overflow-y-auto">
        {
          messages.map((message, i) => <MessageBox
            onClickImage={onClickImage}
            key={message.id}
            data={message}
            isLast={i === messages.length - 1}
          />)
        }
        <div ref={bottomRef} className="pt-24" />
      </div>
    </Fragment>
  )
}

export default Body