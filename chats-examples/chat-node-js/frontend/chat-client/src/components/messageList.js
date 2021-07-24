import { useStore } from 'effector-react'
import { $chatStore } from '../stores/chatStore'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MessageList, Message, Avatar } from '@chatscope/chat-ui-kit-react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

export default function MessageList2() {
    const chatStore = useStore($chatStore)
    return (
        <MessageList style={{
            width:'85vw',
            height: '80vh',
            border: '1px solid gray'
        }}>
            {chatStore.currentMessages.map(m => <Message model={{
            message: m.text,
            sentTime: timeAgo.format(Number.isInteger(+m.date) ? +m.date : new Date(m.date)),
            sender: m.author,
            direction: chatStore.authUser.username === m.author ? "outgoing" : "incoming",
            position: "single"
          }}>
                    <Avatar src="https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png" />
                    {(() =>
                        chatStore.authUser.username === m.author ?
                            <Message.Footer sender={m.author} sentTime={timeAgo.format(Number.isInteger(+m.date) ? +m.date : new Date(m.date))} /> :
                            <Message.Header sender={m.author} sentTime={timeAgo.format(Number.isInteger(+m.date) ? +m.date : new Date(m.date))} />)()
                        }
                  </Message>)}
        </MessageList>
    )
}