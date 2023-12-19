import { io } from "socket.io-client";
import { useAppDispatch } from "../store/hooks";
import { addMessage } from "../store/messagesSlice";

// "undefined" means the URL will be computed from the `window.location` object
const URL: any =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

export const socket = io(URL);
