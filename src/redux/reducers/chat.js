import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  chat: null,
  isLoading: true,
  notifications: 0,
  deleteChat: false,
};
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getMyChat: (state, action) => {
      (state.chat = action.payload), (state.isLoading = false);
    },
    setNotificationCount: (state) => {
      state.notifications = state.notifications + 1;
    },
    clearNotificationCount: (state) => {
      state.notifications = 0;
    },
    setDeleteChat: (state, action) => {
      state.deleteChat = action.payload;
    },
    clearDeleteChat: (state) => {
      state.deleteChat = false;
    },
  },
});

export default chatSlice;
export const {
  getMyChat,
  setNotificationCount,
  clearNotificationCount,
  setDeleteChat,
  clearDeleteChat,
} = chatSlice.actions;
