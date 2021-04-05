import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserHistory} from "global";

interface userSliceInitial{
  history:UserHistory[] | undefined
}

const initialState: userSliceInitial = {
  history:[]
};
export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setHistory: (state, action : PayloadAction<UserHistory>) => {
      const userExists = state.history?.find(
        (user) =>user.id === action.payload.id
      );
      if (!userExists) state.history?.unshift(action.payload);
    },
  },
});


export const { setHistory } = historySlice.actions;
export default historySlice.reducer;
