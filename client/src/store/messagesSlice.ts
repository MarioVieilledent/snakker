import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../types";

interface MessagesSlice {
  messages: Message[];
}

const initialState: MessagesSlice = {
  messages: [],
};

const messagesSlice = createSlice({
  name: "socket",
  initialState,

  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;