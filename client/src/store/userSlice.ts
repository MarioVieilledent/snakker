import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../server/types/user";
import { defaultGuestUser } from "../constants";

interface UserSlice {
  user: User;
}

const initialState: UserSlice = {
  user: {
    username: defaultGuestUser,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    // Initialize the user data
    initUser(state, action) {
      state.user = action.payload;
    },

    setToken(state, action) {
      state.user.token = action.payload;
    },
  },
});

export const { initUser, setToken } = userSlice.actions;

export default userSlice.reducer;
