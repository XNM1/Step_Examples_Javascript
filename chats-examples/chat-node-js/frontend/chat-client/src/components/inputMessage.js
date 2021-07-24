import React, { useState } from 'react'
import { useStore } from 'effector-react'
import { $chatStore } from '../stores/chatStore'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MessageInput } from '@chatscope/chat-ui-kit-react'

export default function InputMessage() {
    const chatStore = useStore($chatStore)
    const [messageInputValue, setMessageInputValue] = useState("");
    return (
      <MessageInput value={messageInputValue} onChange={val => setMessageInputValue(val)} placeholder="Type message here..." onSend={() => {
        chatStore.socket.sendMessage({
          text: messageInputValue,
          author: chatStore.authUser.username,
          to: chatStore.currentUser.username,
          date: Date.now().toString()
        })
        setMessageInputValue('')}}>
      </MessageInput>
    );
}