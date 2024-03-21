const {Server} = require('socket.io');
const {User,Merchant} = require("../models") 
const {BadRequestError, NotFoundError} = require('../errors');
const lookupUser = async (username) => {
    const checkUser = await User.findOne({where:
        {
            userName:username,
            role:"buyer"
        }
        })
    return checkUser
}
const lookupMerchant = async (username) => {
    const checkUser = await User.findOne({where:
        {
            userName:username,
            role:"merchant"
        }
        })
    return checkUser
}

const socketConnect = (server) => {

    
    const io = new Server(server, {
        path: "/chat_services"
    })
    var data=[]
    io.on("connection", async (socket) => {

            if(socket.handshake.query.merchant===undefined){
                lookupUser(socket.handshake.query.username).then(res=>{
                    if(res===null){
                        throw new NotFoundError("username does not exist")
                    }else{
                        data.push(
                            res.userName
                    )
                    }
                }).catch(error=>{
                    console.log(error)
                    socket.disconnect()
                    }) 
            console.log("user connected", socket.id);
            socket.on("disconnect", () => {
                console.log("disconnected");
            })
            }else{
            lookupMerchant(socket.handshake.query.merchant).then(res=>{
                if(res===null){
                    throw new NotFoundError("merchant does not exist")
                }else{
                    data.push(
                        res.userName
                )
                }
            }).catch(error=>{
                    console.log(error)
                    socket.disconnect()
                    })}
                socket.on("chat message", (msg) => { // chat message is event message
                    console.log(data)
                    io.emit(data[0],msg)
                    io.emit(data[1],msg) 
                    console.log("message: ", msg);
                }) 
    
            
        socket.on("disconnect", () => {
            console.log("disconnected");
            data=[]
        })

})
}
module.exports = {socketConnect,lookupMerchant}