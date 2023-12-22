import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./messagesSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    messages: messageReducer,
    user: userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
