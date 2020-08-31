const express = require('express');
const app= express();
const server = require('http').createServer(app);
const io= require('socket.io').listen(server);

const port = 3000;
app.get('/',(req,res)=> res.send('ok'))

io.on('connection',socket => {
    console.log('userconnected');
    socket.on("chat message",mesg => {
        console.log(mesg+ " "+socket.id);
        io.emit("chat message",mesg);
    });
});

server.listen(port , ()=> console.log("server running"));