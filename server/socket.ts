import { getLastNDocuments, sendMessage } from "./mongo";
import { Message } from "./types/message";
import { SocketWrapper } from "./types/socketTypes";

const NumberOfMessageswLoadedOnConnection: number = 100;

function handleSocket(http: any) {
  const io = require("socket.io")(http, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket: any) => {
    getLastNDocuments(NumberOfMessageswLoadedOnConnection)
      .then((data) => {
        socket.emit("fetchLastMessages", data);
      })
      .catch((e) => {
        console.error(e);
      });

    socket.on("disconnect", () => {
      // Nothing here for now
    });

    // When a user send a message
    socket.on("sendMessage", (wrapped: SocketWrapper<Message>) => {
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
    });
  });
}

export default handleSocket;
