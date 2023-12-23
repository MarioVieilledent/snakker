import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./messagesSlice";
import userReducer from "./userSlice";
import socketEventReducer from "./socketEventSlice";

export const store = configureStore({
  reducer: {
    messages: messagesReducer,
    user: userReducer,
    socketEvent: socketEventReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
