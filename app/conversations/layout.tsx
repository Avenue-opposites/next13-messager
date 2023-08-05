import Sidebar from '~/app/components/sidebar/Sidebar'
import getConversations from '../actions/getConversations'
import ConversationList from './components/ConversationList'
import getUsers from '../actions/getUsers'

export default async function ({
  children
}: {
  children: React.ReactNode
}) {
  const conversations = await getConversations()
  const users = await getUsers()

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <ConversationList users={users} initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  )
}