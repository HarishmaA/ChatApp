const express = require('express');
const socket = require('socket.io');
//App setup
const app = express();

const server = app.listen(4000, ()=> 
    console.log("listening to request on port 4000"));

//serve files in public folder in browser
app.use(express.static('public'));

//socket setup
const io = socket(server);

io.on('connection',(socket)=> {
    console.log("made socket connection " + socket.id);
    socket.on('chat',(data)=>{
        io.sockets.emit('chat', data);
    })
    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data);
    })
});