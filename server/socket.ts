import { getLastNDocuments, sendMessage } from "./mongo";
import { Message } from "./types/message";
import { User } from "./types/user";
import { SocketWrapper } from "./types/socketTypes";
import { appPassword, auth, appToken } from "./access";

const NumberOfMessageswLoadedOnConnection: number = 100;

function handleSocket(http: any) {
  const io = require("socket.io")(http, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket: any) => {
    // When a user disconnects
    socket.on("disconnect", () => {
      // Nothing here for now
    });

    // When a user tries to log in
    socket.on("tryToConnect", (wrapped: SocketWrapper<User>) => {
      if (wrapped.data.password === appPassword) {
        getLastNDocuments(NumberOfMessageswLoadedOnConnection)
          .then((messages) => {
            socket.emit("connectionOk", { messages, token: appToken });
          })
          .catch((e) => {
            console.error(e);
          });
      } else {
        socket.emit("connectionFailed", { reason: "Wrong password" });
      }
    });

    // When a user send a message
    socket.on("sendMessage", (wrapped: SocketWrapper<Message>) => {
      if (auth(wrapped.token)) {
        sendMessage(wrapped.data)
          .then((data) => {
            console.log(`sendMessage in mongo db worked: ${data}`);

            // Send the user the message had been sent correctly
            socket.emit("messageConfirmation", wrapped.data);

            // Send the message to all other user connected
            io.sockets.emit("newMessage", { message: wrapped.data });
          })
          .catch((e) => {
            console.error(e);
          });
      } else {
        socket.emit("notAllowed", { reason: "Wrong token" });
      }
    });
  });
}

export default handleSocket;
