import { useStore } from 'effector-react'
import { $chatStore, UsersApi } from '../stores/chatStore'
import { getMessagesChat } from '../services/restApi/messagesApi'
import { MESSAGES_CHAT_URI } from '../configs/uris'
import React, { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { ConversationList, Conversation, Avatar } from '@chatscope/chat-ui-kit-react'

export default function ContactList() {
    const chatStore = useStore($chatStore)
    const prevContactElement = React.useRef(null);
    const select = e => {
        const username = e.currentTarget.dataset.username
        UsersApi.selectUser(username)
        if(!chatStore.receivedUsers.has(chatStore.authUser.username) || !chatStore.receivedUsers.has(username)) {
            UsersApi.setReceivedUsers({
                username1: chatStore.authUser.username,
                username2: username
            })
            getMessagesChat(MESSAGES_CHAT_URI, chatStore.authUser.username, username).then(UsersApi.pushMessages)
        }
        //Array.from(e.currentTarget.children).forEach(c => c.style.backgroundColor = 'white')
        if (prevContactElement.current) prevContactElement.current.style.backgroundColor = 'white'
        e.currentTarget.style.backgroundColor = '#ADD8E6'
        prevContactElement.current = e.currentTarget
    }
    if (chatStore.users[0] && chatStore.users[0].username) return (
        <ConversationList style={{
            width: '15vw',
            height: '80vh',
            border: '1px solid gray'
        }}>
            {chatStore.users.map(u => <Conversation data-username={u.username} name={u.username} onClick={select}>
                                        <Avatar src="https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png" status={u.isOnline ? "available" : "invisible"} />
                                        </Conversation>)}
        </ConversationList>
    )
    else return <p>None</p>
}