import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  notifications: [],
  isLoading: true,
};
const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    isLoader: (state) => {
      (state.isLoading = true), (state.notifications = []);
    },
    getNotifications: (state, action) => {
      (state.notifications = action.payload), (state.isLoading = false);
    },
  },
});

export default notificationsSlice;
export const { getNotifications, isLoader } = notificationsSlice.actions;
