import { useParams } from 'next/navigation'
import { useMemo } from 'react'

export default function useConversation() {
  const params = useParams()
  // 会话id
  const conversationId = useMemo(() => {
    if(!params?.conversationId) {
      return ''
    }

    return params.conversationId
  }, [params.conversationId])
  // 是否打开会话
  const isOpen = useMemo(() => Boolean(conversationId), [conversationId])
  
  return useMemo(() => ({
    conversationId,
    isOpen
  }), [conversationId, isOpen])
}