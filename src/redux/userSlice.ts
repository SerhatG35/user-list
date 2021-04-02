import { createSlice } from "@reduxjs/toolkit";
import { UserHistory, UserPosts } from "global";

interface userSliceInitial{
  userPosts: UserPosts[] | undefined;
  history:UserHistory[] | undefined
}

const initialState: userSliceInitial = {
  userPosts: undefined,
  history:[]
};

export const userSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userPosts = action.payload;
    },
    pushHistory: (state, action) => {
      state?.history?.push(action.payload);
    }
  },
});


export const { setUser , pushHistory} = userSlice.actions;
export default userSlice.reducer;
