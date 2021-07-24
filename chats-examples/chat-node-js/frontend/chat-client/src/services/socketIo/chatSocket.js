import { UsersApi } from '../../stores/chatStore'
import { io } from "socket.io-client"

export class ChatSocketService {
    constructor(uri, username) {
        this.uri = uri
        this.username = username
    }

    start() {
        this.socket = io(this.uri, {
            withCredentials: false
        })
        this._connect()
        this._listen()
    }

    _connect() {
        this.socket.emit('online', this.username)
    }

    sendMessage(message) {
        this.socket.emit('message', message)
    }

    _listen() {
        this.socket.on('onlineUsers', usernames => UsersApi.setOnlineUsers(usernames))
        this.socket.on('message', message => UsersApi.pushMessages([message]))
        this.socket.on('offlineUsers', usernames => UsersApi.setOfflineUsers(usernames))
        this.socket.on('newUser', user => UsersApi.pushUsers(user))
    }
}