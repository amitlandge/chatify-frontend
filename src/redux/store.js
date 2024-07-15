import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import chatSlice from "./reducers/chat";
import miscSlice from "./reducers/misc";
import notificationsSlice from "./reducers/notifications";
import chatDetailsSlice from "./reducers/chatDetails";
import messagesSlice from "./reducers/message";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [notificationsSlice.name]: notificationsSlice.reducer,
    [chatDetailsSlice.name]: chatDetailsSlice.reducer,
    [messagesSlice.name]: messagesSlice.reducer,
  },
});
export default store;
