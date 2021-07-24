export async function getUsers(uri) {
    const res = await fetch(uri, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'},
    })
    return res.json()
}

export async function postUser(uri, user) {
    const res = await fetch(uri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify(user)
    })
    return res.json()
}