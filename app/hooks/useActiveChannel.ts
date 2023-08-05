import { useEffect, useState } from 'react'
import useActiveList from './useActiveList'
import { Channel, Members } from 'pusher-js'
import { pusherClient } from '../libs/pusher'

export default function useActiveChannel() {
  const { set, add, remove } = useActiveList()
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null)

  useEffect(() => {
    let channel = activeChannel

    if(!channel) {
      channel = pusherClient.subscribe('react-messenger')
      setActiveChannel(channel)
    }

    channel.bind('pusher:subscription_succeeded', (members: Members) => {
      const initialMembers: string[] = []

      members.each((member: Record<string, any>) => initialMembers.push(member.id))

      set(initialMembers)
    })

    channel.bind('pusher:member_added', (member: Record<string, any>) => {
      add(member.id)
    })

    channel.bind('pusher:member_removed', (member: Record<string, any>) => {
      remove(member.id)
    })

    return () => {
      pusherClient.unsubscribe('react-messenger')
      setActiveChannel(null)
    }
  }, [set, add, remove, activeChannel])
}