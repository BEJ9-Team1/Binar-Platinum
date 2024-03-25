const { Server } = require("socket.io");
const { User } = require("../models");
const { NotFoundError } = require("../errors");
const lookupUser = async (username) => {
  const checkUser = await User.findOne({
    where: {
      userName: username,
      role: "buyer",
    },
  });
  return checkUser;
};
const lookupMerchant = async (username) => {
  const checkUser = await User.findOne({
    where: {
      userName: username,
      role: "merchant",
    },
  });
  return checkUser;
};

const socketConnect = (server) => {
  const io = new Server(server, {
    path: "/chat_services",
  });
  let data = [];
  io.on("connection", async (socket) => {
    if (socket.handshake.query.merchant === undefined) {
      lookupUser(socket.handshake.query.buyer)
        .then((res) => {
          if (res === null) {
            throw new NotFoundError("buyer does not exist");
          } else {
            data.push(res.userName);
          }
        })
        .catch((error) => {
          console.log(error);
          socket.disconnect();
        });
      console.log("user connected", socket.id);
      socket.on("disconnect", () => {
        console.log("disconnected");
      });
    } else {
      lookupMerchant(socket.handshake.query.merchant)
        .then((res) => {
          if (res === null) {
            throw new NotFoundError("merchant does not exist");
          } else {
            data.push(res.userName);
          }
        })
        .catch((error) => {
          console.log(error);
          socket.disconnect();
        });
    }
    console.log(socket.request.eventNames());
    socket.on("chat message", (msg) => {
      io.emit(data[0], msg);
      io.emit(data[1], msg);
      console.log("message: ", msg);
      // chat message is event message
    });

    socket.on("disconnect", () => {
      //socket.removeAllListeners("chat message");
      console.log("disconnected");
      data = [];
    });
  });
};
module.exports = socketConnect;
