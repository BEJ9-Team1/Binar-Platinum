const {Server} = require('socket.io');
const {User} = require("../models") 

// const findOne  

const socketConnect = (server) => {

    
    const io = new Server(server, {
        path: "/chat_services"
    })
    
    io.on("connection", (socket) => { 
        console.log(socket.handshake.query.userId);
        console.log("user connected", socket.id);
        socket.on("chat message", (msg) => { // chat message is event message
            io.emit("id merchant",msg) //id merchant
            io.emit("id buyer",msg)//id buyer
            console.log("message: ", msg);
        }) 
        socket.on("disconnect", () => {
            console.log("disconnected");
        })
    })
}

module.exports = socketConnect
