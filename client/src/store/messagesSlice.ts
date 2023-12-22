import { createSlice } from "@reduxjs/toolkit";
import { Message } from "../../../server/types/message";

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
    // Initialize the list of messages
    initMessages(state, action) {
      state.messages = action.payload;
    },

    // Add a message in the list
    addMessage(state, action) {
      // Method unshift: pushes at index 0
      state.messages.unshift(action.payload);
    },
  },
});

export const { addMessage, initMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
