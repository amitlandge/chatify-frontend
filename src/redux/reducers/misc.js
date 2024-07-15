import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isNewGroup: false,
  isAddMember: false,
  isNotification: false,
  isSearch: false,
  isFileMenu: false,
  isDeleteMenu: false,
  uploadingLoader: false,
  isMobile: false,
  selectedDeleteChat: {
    chatId: "",
    groupChat: false,
  },
  emojiPicker: false,
  navbarMenu: false,
};
const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setIsNewGroup: (state, action) => {
      state.isNewGroup = action.payload;
    },
    setIsAddMember: (state, action) => {
      state.isAddMember = action.payload;
    },
    setIsNotification: (state, action) => {
      state.isNotification = action.payload;
    },
    setIsSearch: (state, action) => {
      state.isSearch = action.payload;
    },
    setIsFileMenu: (state, action) => {
      state.isFileMenu = action.payload;
    },
    setDeleteMenu: (state, action) => {
      state.isDeleteMenu = action.payload;
    },
    setUploadingLoader: (state, action) => {
      state.uploadingLoader = action.payload;
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setSelectDeleteChat: (state, action) => {
      state.selectedDeleteChat.chatId = action.payload.chatId;
      state.selectedDeleteChat.groupChat = action.payload.groupChat;
    },
    setEmojiPicker: (state, action) => {
      state.emojiPicker = action.payload;
    },
    setNavbarMenu: (state, action) => {
      state.navbarMenu = action.payload;
    },
  },
});

export default miscSlice;
export const {
  setDeleteMenu,
  setIsAddMember,
  setIsFileMenu,
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
  setSelectDeleteChat,
  setUploadingLoader,
  setEmojiPicker,
  setNavbarMenu,
} = miscSlice.actions;
