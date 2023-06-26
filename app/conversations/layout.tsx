import Sidebar from "~/app/components/sidebar/Sidebar"
import getConversations from "../actions/getConversations"
import ConversationList from "./components/ConversationList"

export default async function ({
  children
}: {
  children: React.ReactNode
}) {
  const conversations = await getConversations()

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  )
}