import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  chatDetails: null,
  isLoading: true,
};
const chatDetailsSlice = createSlice({
  name: "chatDetails",
  initialState,
  reducers: {
    getMyChatDeails: (state, action) => {
      (state.chatDetails = action.payload), (state.isLoading = false);
    },
  },
});

export default chatDetailsSlice;
export const { getMyChatDeails } = chatDetailsSlice.actions;
