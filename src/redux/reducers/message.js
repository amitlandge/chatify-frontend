import { createSlice } from "@reduxjs/toolkit";
import { getMessageAlertLocalStorage } from "../../utils/features";
const initialState = {
  messages: null,
  isLoading: true,
  totalPages: 0,
  newMessageAlert: getMessageAlertLocalStorage("", "GET") || [
    {
      chatId: "",
      count: 0,
    },
  ],
};
const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    getMessages: (state, action) => {
      (state.messages = action.payload?.chats), (state.isLoading = false);
      state.totalPages = action.payload?.totalPages;
    },
    clearGetMessage: (state) => {
      (state.messages = null), (state.isLoading = false);
      state.totalPages = 0;
    },
    setNewMessageAlert: (state, action) => {
   
      const search = state.newMessageAlert.findIndex((item) => {
        return item.chatId === action.payload.chatId;
      });
     
      if (search !== -1) {
        state.newMessageAlert[search].count += 1;
      } else {
        state.newMessageAlert.push({
          chatId: action.payload.chatId,
          count: 1,
        });
      }
    },
    clearNewMessageAlert: (state, action) => {
      state.newMessageAlert = state.newMessageAlert.filter((item) => {
        item.chatId !== action.payload;
      });
    },
  },
});

export default messagesSlice;
export const {
  getMessages,
  setNewMessageAlert,
  clearNewMessageAlert,
  clearGetMessage,
} = messagesSlice.actions;
