import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";

import "./App.css";

import { SocketProvider } from "./context/socketContext";
import SkeletonLoader from "./Components/Layout/SkeletonLoader";
import useMyProfile from "./Hooks/useMyProfile";

import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const Login = lazy(() => import("./Pages/Login"));
const Home = lazy(() => import("./Pages/Home"));
const Dashboard = lazy(() => import("./Components/Admin/Dashboard"));
const AdminChats = lazy(() => import("./Components/Admin/AdminChats"));
const AdminMessages = lazy(() => import("./Components/Admin/AdminMessages"));
const AdminUsers = lazy(() => import("./Components/Admin/AdminUsers"));
const Chat = lazy(() => import("./Pages/Chat"));
const Group = lazy(() => import("./Components/Group/Group"));
const AdminPrivate = lazy(() => import("./Private/AdminPrivate"));
const PrivateRoutes = lazy(() => import("./Private/PrivateRoutes"));
const Friends = lazy(() => import("./Pages/Friends"));
const FriendProfile = lazy(() => import("./Pages/FriendProfile"));
const Profile = lazy(() => import("./Pages/Profile"));
const NotFound = lazy(() => import("./Pages/NotFound"));
function App() {
  const theme = createTheme();

  const [loadUser] = useMyProfile();
  loadUser();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Suspense fallback={<SkeletonLoader />}>
          <Routes>
            <Route
              element={
                <SocketProvider>
                  <PrivateRoutes />
                </SocketProvider>
              }
            >
              <Route path="/home" element={<Home />} index={true} />
              <Route path="/" element={<Home />}>
                <Route path="/home" element={<Home />} />
              </Route>
              <Route path="/chat/:chatId" element={<Chat />} />
              <Route path="/groups" element={<Group />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/friends/:uid" element={<FriendProfile />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route element={<AdminPrivate />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/chats" element={<AdminChats />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/messages" element={<AdminMessages />} />
            </Route>

            <Route path="*" element={<NotFound />} />
            <Route path="/not" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
