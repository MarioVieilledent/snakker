import { io } from "socket.io-client";
import { Message } from "../../../server/types/message";
import { SocketWrapper } from "../../../server/types/socketTypes";
import { User } from "../../../server/types/user";
import { store } from "@store/store";
import { addMessage, initMessages } from "@store/messagesSlice";
import { setToken } from "@store/userSlice";
import { newEvent } from "@store/socketEventSlice";

// "undefined" means the URL will be computed from the `window.location` object
const URL: any =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

export const socket = io(URL);

// After trying to connect, success
socket.on(
  "connectionOk",
  ({ messages, token }: { messages: Message[]; token: string }) => {
    store.dispatch(newEvent({ event: "connectionOk", description: "none" }));
    store.dispatch(setToken(token));
    store.dispatch(initMessages(messages));
  },
);

// After trying to connect, fail
socket.on("connectionFailed", ({ reason }: { reason: string }) => {
  console.log("Connection failed, reason: " + reason);
  store.dispatch(newEvent({ event: "connectionFailed", description: "none" }));
});

// When any task is refused by server
socket.on("notAllowed", ({ reason }: { reason: string }) => {
  store.dispatch(newEvent({ event: "notAllowed", description: reason }));
});

// Confirmation of the message just sent
socket.on("messageConfirmation", (mes: Message) => {
  store.dispatch(addMessage(mes));
});

// Tries to connect as a user
export const tryToConnectSocket = (user: User): void => {
  const wrappedUser = wrap("tryToConnect", user);
  socket.emit("tryToConnect", wrappedUser);
};

// Send a message to the server
export const sendMessageSocket = (content: string): void => {
  const message: Message = {
    author: "debug",
    date: new Date().toString(),
    content,
  };
  const wrappedMessage = wrap("sendMessage", message);
  socket.emit("sendMessage", wrappedMessage);
};

// Socket Wrapper, add a name, a date, the user info and a token
const wrap = <T>(name: string, data: T): SocketWrapper<T> => {
  return {
    name,
    token: store.getState().user.user.token ?? "",
    date: new Date().toString(),
    data,
  };
};
