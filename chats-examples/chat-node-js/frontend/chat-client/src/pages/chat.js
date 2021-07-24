import { useStore } from 'effector-react'
import { $chatStore, UsersApi } from '../stores/chatStore'
import { getUsers } from '../services/restApi/usersApi'
import { USERS_URI } from '../configs/uris'
import ContactList from '../components/contactList'
import MessageList from '../components/messageList'
import InputMessage from '../components/inputMessage'
import React from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, Sidebar } from '@chatscope/chat-ui-kit-react'

export default function ChatPage() {
    const chatStore = useStore($chatStore)
    React.useEffect(async () => {
        UsersApi.pushUsers(await getUsers(USERS_URI))
    }, [])
    return (
        <div style={{
            border: '1px solid gray'
        }}>
            <h1 onClick={() => {
                console.log(chatStore)
            }}>Wellcome, {chatStore.authUser.username}</h1>
            <MainContainer responsive>
                <Sidebar position="left" scrollable={false}>
                    <ContactList/>
                </Sidebar>
                <div>
                    <MessageList/>
                    <InputMessage/>
                </div>
            </MainContainer>
        </div>
    )
}