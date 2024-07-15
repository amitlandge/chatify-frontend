import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  isLoading: true,
  isAdmin: false,
  friends: [],
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isLoader: (state) => {
      (state.isLoading = true), (state.user = null);
    },
    isAuthenticated: (state, action) => {
      (state.user = action.payload), (state.isLoading = false);
    },
    isNotAuthenticated: (state) => {
      (state.user = null), (state.isLoading = false);
    },
    myFriends: (state, action) => {
      state.friends = action.payload;
    },
  },
});

export default authSlice;
export const { isAuthenticated, isNotAuthenticated, isLoader, myFriends } =
  authSlice.actions;
