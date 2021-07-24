import { UsersApi } from '../stores/chatStore'
import React from 'react'
import { ChatSocketService } from '../services/socketIo/chatSocket'
import { postUser } from '../services/restApi/usersApi'
import { SOCKET_URI, USERS_URI } from '../configs/uris'
import { Link } from "react-router-dom"
import { Input, Button, Center } from "@chakra-ui/react"

export default function AuthPage() {
    const usernameElement = React.useRef(null);
    return (
      <Center h="100vh">
        <Input placeholder="Enter username" ref={usernameElement} style={{width: '300px', marginRight: '10px'}}/>
        <Link to="/chat"><Button onClick={() => {
            postUser(USERS_URI, { username: usernameElement.current.value });
            let socket = new ChatSocketService(SOCKET_URI, usernameElement.current.value);
            socket.start();
            UsersApi.auth({
              user: { username: usernameElement.current.value },
              socket
        })
        }}>Enter</Button></Link>
      </Center>
    );
}