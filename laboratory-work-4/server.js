const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/index.html'));
//const server = http.createServer(app);
// const io = socketIo(server);
// app.use(cors());

const users = {};

io.on('connection', (socket) => {
  socket.on('join', (username) => {
    console.log(username)
    users[socket.id] = username;
    io.emit('user-connected', username);
    //socket.broadcast.emit('user-connected', username);
  });

  socket.on('disconnect', () => {
    const username = users[socket.id];
    delete users[socket.id];
    if (username) {
      io.emit('user-disconnected', username);
    }
  });

  socket.on('chat-message', (message) => {
    console.log('sdfsdf')
    const username = users[socket.id];
    if (username) {
      io.emit('message', { username, message });
    }
  });
});



server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
