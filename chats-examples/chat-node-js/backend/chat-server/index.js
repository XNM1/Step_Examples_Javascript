import express from 'express';
import mongoose from 'mongoose'
import {
    Server
} from 'socket.io'
import http from 'http'
import cors from 'cors'

mongoose.connect("mongodb://mongo:27017/chatdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: false
    }
});

const User = mongoose.model("User", {
    username: String,
    avatar: String
});
const Message = mongoose.model("Message", {
    author: String,
    text: String,
    date: Date,
    to: String
});

app.use(express.json());
app.use(cors());
let clientSockets = [];

app.post('/api/v1/users/', async (req, res) => {
    let user = await User.findOne({
        username: req.body.username
    }).exec();
    if (!user) {
        user = {
            username: req.body.username,
            avatar: req.body.avatar
        };
        const newUser = new User(user);
        await newUser.save();
        for (let s of clientSockets) s.emit('newUser', user);
        res.send({
            code: 1,
            answer: "ok, new user has been created"
        });
    } else res.send({
        code: 2,
        answer: "ok, but user is already exist"
    });
});

app.get('/api/v1/users/:username', async (req, res) => {
    let user = await User.findOne({
        username: req.params.username
    }).exec();
    if (user) res.send(user);
    else res.send({
        answer: "error, user not found"
    });
});

app.get('/api/v1/users/', async (req, res) => {
    let users = await User.find({}).exec();
    if (users) res.send(users);
    else res.send({
        answer: "error, we don't have users"
    });
});

app.get('/api/v1/messages/', async (req, res) => {
    let messages = await Message.find({}).exec();
    if (messages) res.send(messages);
    else res.send({
        answer: "error, we don't have users"
    });
});

app.post('/api/v1/messages/chat', async (req, res) => {
    const user1 = req.body.user1;
    const user2 = req.body.user2;
    let messages = await Message.find().or([{ author: user1, to: user2 }, { author: user2, to: user1 }]).exec();
    if (messages) res.send(messages.sort((a,b) => a.date > b.date ? 1 : a.date < b.date ? -1 : 0));
    else res.send({
        answer: "error, user not found"
    });
});

io.on('connection', clientSocket => {
    console.log('Someone connecting')
    clientSockets.push(clientSocket);
    clientSocket.on('online', username => {
        clientSocket.username = username;
        console.log(`${username} connected`)
        for (let s of clientSockets) s.emit('onlineUsers', [username]);
    });
    clientSocket.emit('onlineUsers', clientSockets.map(s => s.username));

    clientSocket.on('message', data => {
        const message = new Message(data);
        message.save();
        clientSockets.filter(s => s.username === data.to || s.username === data.author).forEach(s => s.emit('message', data));
        console.log(`${data.author} send message to ${data.to}`)
    });

    clientSocket.on('disconnect', data => {
        for (let s of clientSockets) s.emit('offlineUsers', [clientSocket.username]);
    });
});

server.listen(80, () => {
    console.log("Server is working...");
})