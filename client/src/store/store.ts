import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./messagesSlice";

export const store = configureStore({
  reducer: { messages: messageReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
