import { createSlice } from "@reduxjs/toolkit";

interface SocketEventSlice {
  event: "notAllowed" | "tryToConnect" | "none";
  description: string;
}

const initialState: SocketEventSlice = {
  event: "none",
  description: "none",
};

const socketEventSlice = createSlice({
  name: "socketEvent",
  initialState,

  reducers: {
    newEvent(state, action: { payload: SocketEventSlice }) {
      state.event = action.payload.event;
      state.description = action.payload.description;
    },
  },
});

export const { newEvent } = socketEventSlice.actions;

export default socketEventSlice.reducer;
