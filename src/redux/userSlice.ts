import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  UserPosts } from "global";

interface userSliceInitial{
  userPosts: UserPosts[] | undefined;
}

const initialState: userSliceInitial = {
  userPosts: undefined,
};
export const userSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {
    setUser: (state, action : PayloadAction<UserPosts[]>) => {
      state.userPosts = action.payload;
    },
  },
});


export const { setUser } = userSlice.actions;
export default userSlice.reducer;
