import { io } from "socket.io-client";
import { addMessage } from "../store/messagesSlice";
import { store } from "../store/store";
import { Message } from "../../../types/message";
import { SocketWrapper } from "../../../types/socketTypes";

// "undefined" means the URL will be computed from the `window.location` object
const URL: any =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

export const socket = io(URL);

/**
 * Get new message from server
 */
socket.on("newMessage", (data: Message) => {
  store.dispatch(addMessage(data));
});

/**
 * Wraps message content and send it to server
 */
export const sendMessage = (content: string): void => {
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

  socket.emit("test", wrappedMessage);
};
