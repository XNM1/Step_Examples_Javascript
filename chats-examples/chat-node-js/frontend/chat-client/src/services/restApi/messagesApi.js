export async function getMessagesChat(uri, user1, user2) {
    const res = await fetch(uri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({ user1, user2 })
    })
    return res.json()
}