import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import historyReducer from "./historySlice";

export const store = configureStore({
  reducer: {
    userPosts: userReducer,
    history: historyReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
