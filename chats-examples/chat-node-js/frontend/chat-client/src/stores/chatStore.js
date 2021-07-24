import {createStore, createApi} from 'effector'
import produce, { enableMapSet } from 'immer'
enableMapSet()

export const $chatStore = createStore({
    users: [],
    receivedUsers: new Set(),
    messages: [],
    currentMessages: [],
    authUser: null,
    currentUser: null,
    socket: null
})

export const UsersApi = createApi($chatStore, {
    pushUsers: produce((state, users) => {
        if(users.length && users.length > 0) state.users.push(...users.filter(user => user.username && user.username != state.authUser.username))
        else if(users.username && users.username !== state.authUser.username) state.users.push(users)
    }),
    setOnlineUsers: produce((state, usernames) => {
        state.users.filter(u => usernames.includes(u.username)).forEach(u => u.isOnline = true)
    }),
    setOfflineUsers: produce((state, usernames) => {
        state.users.filter(u => usernames.includes(u.username)).forEach(u => u.isOnline = false)
    }),
    selectUser: produce((state, username) => {
        state.currentUser = state.users.find(u => u.username === username)
        state.currentMessages = state.messages.filter(m => (m.author === state.authUser.username && m.to === state.currentUser.username) || (m.author === state.currentUser.username && m.to === state.authUser.username))
    }),
    auth: produce((state, payload) => {
        state.authUser = payload.user
        state.socket = payload.socket
    }),
    pushMessages: produce((state, messages) => {
        if(messages.length && messages.length > 0 && messages.some(m => state.receivedUsers.has(m.author))) state.messages.push(...messages)
        else if(messages.text && state.receivedUsers.has(messages.author)) state.messages.push(messages)
        if(state.currentUser) state.currentMessages.push(...messages.filter(m => (m.author === state.authUser.username && m.to === state.currentUser.username) || (m.author === state.currentUser.username && m.to === state.authUser.username)))
    }),
    setReceivedUsers: produce((state, payload) => {
        state.receivedUsers.add(payload.username1)
        state.receivedUsers.add(payload.username2)
    })
})