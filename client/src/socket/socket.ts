import { io } from "socket.io-client";
import { addMessage, initMessages } from "../store/messagesSlice";
import { store } from "../store/store";
import { Message } from "../../../server/types/message";
import { SocketWrapper } from "../../../server/types/socketTypes";

// "undefined" means the URL will be computed from the `window.location` object
const URL: any =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

export const socket = io(URL);

// Fetch messages on load
socket.on("fetchLastMessages", (data: Message[]) => {
  store.dispatch(initMessages(data));
});

// Get new message from server

// Confirmation of the message just sent
socket.on("messageConfirmation", (mes: Message) => {
  store.dispatch(addMessage(mes));
});

/**
 * Wraps message content and send it to server
 */
export const sendMessageSocket = (content: string): void => {
  const message: Message = {
    author: "debug",
    content,
  };

  const wrappedMessage: SocketWrapper<Message> = {
    name: "sendMessage",
    token: "unsafe-token",
    date: new Date(),
    data: message,
  };

  socket.emit("sendMessage", wrappedMessage);
};
