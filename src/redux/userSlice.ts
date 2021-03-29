import { createSlice } from "@reduxjs/toolkit";
import { UserPosts } from "global";

interface CounterState {
  userPosts: UserPosts[] | undefined;
}

const initialState: CounterState = {
  userPosts: undefined,
};

export const userSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userPosts = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
