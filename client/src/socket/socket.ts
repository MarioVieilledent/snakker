import { io } from "socket.io-client";
import { Message } from "../../../server/types/message";
import { SocketWrapper } from "../../../server/types/socketTypes";
import { User } from "../../../server/types/user";
import { store } from "@store/store";
import { addMessage, initMessages } from "@store/messagesSlice";
import { initUser, setToken } from "@store/userSlice";
import { newEvent } from "@store/socketEventSlice";
import { setUserAndTokenLS } from "@/localStorage";

// "undefined" means the URL will be computed from the `window.location` object
const URL: any =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

export const socket = io(URL);

export let connectionPromise: Promise<any> = new Promise((resolve, reject) => {
  // After trying to connect, success
  socket.on(
    "connectionOk",
    ({
      messages,
      user,
      token,
    }: {
      messages: Message[];
      user: User;
      token: string;
    }) => {
      // Save the token and the user information
      setUserAndTokenLS({ user, token: token });
      store.dispatch(initUser(user)); // Init user
      store.dispatch(setToken(token));
      store.dispatch(initMessages(messages));
      resolve({});
    },
  );

  // After trying to connect, fail
  socket.on("connectionFailed", ({ reason }: { reason: string }) => {
    reject(reason);
  });
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
  store.dispatch(
    newEvent({ event: "tryToConnect", description: new Date().toString() }),
  );
  const wrappedUser = wrap("tryToConnect", user);
  socket.emit("tryToConnect", wrappedUser);
};

// Send a message to the server
export const sendMessageSocket = (content: string): void => {
  const message: Message = {
    username: store.getState().user.user.username,
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
