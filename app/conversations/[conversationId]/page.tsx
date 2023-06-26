import getConversationById from '~/app/actions/getConversationById'
import getMessages from '~/app/actions/getMessages'
import EmptyState from '~/app/components/EmptyState'
import Body from './components/Body';
import Form from './components/Form';
import Header from './components/Header'

interface Params {
  conversationId: string;
}

const ConversationIdPage = async ({
  params
}:{ 
  params: Params
 }) => {
  const conversation = await getConversationById(params.conversationId)
  const messages = await getMessages(params.conversationId)
  // 如果没有会话，返回空状态
  if(!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    )
  }

  return (
    <div className="lg:pl-80 h-screen">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body />
        <Form />
      </div>
    </div>
  )
}

export default ConversationIdPage