import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Pages/Header";

import ChatList from "../Chat/ChatList";
import "./Wrapper.css";

import { Drawer, Grid } from "@mui/material";

import { useCallback, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getMyChat, setNotificationCount } from "../../redux/reducers/chat";
import { setIsMobile } from "../../redux/reducers/misc";
import { getSocket } from "../../context/getSocket";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  REFETCH_DATA,
} from "../../constants/eventConstant";
import { setNewMessageAlert } from "../../redux/reducers/message";
import { getMessageAlertLocalStorage } from "../../utils/features";
import { useGetData } from "../../Hooks/useGetData";
import toast from "react-hot-toast";
import { server } from "../../utils/config";
import axios from "axios";

const Wrapper = (prop) => {
  const component = prop.children;
  const socket = getSocket();
  const params = useParams();
  const dispatch = useDispatch();
  const { chat } = useSelector((state) => state.chat);
  const { isMobile } = useSelector((state) => state.misc);

  const { newMessageAlert } = useSelector((state) => state.messages);
  const chatId = params.chatId;
  const navigate = useNavigate();

  const [, data, getInitialData] = useGetData("api/v1/chat/mychats");
  if (data) {
    dispatch(getMyChat(data?.transFormChats));
  }

  useEffect(() => {
    getInitialData();
    if (data) {
      dispatch(getMyChat(data?.transFormChats));
    }
  }, [chatId]);
  const closeDrawerHandler = () => {
    dispatch(setIsMobile(false));
  };
  const notificationCount = useCallback(() => {
    dispatch(setNotificationCount());
  }, [dispatch]);
  useEffect(() => {
    socket.on(NEW_REQUEST, notificationCount);
  }, [notificationCount, socket]);

  const newMessageAlertFun = useCallback(
    (data) => {
      if (data.chatId === chatId) {
        return;
      }
      dispatch(setNewMessageAlert({ chatId: data?.chatId }));
    },
    [dispatch, chatId]
  );
  useEffect(() => {
    getMessageAlertLocalStorage(newMessageAlert);
  }, [newMessageAlert]);
  useEffect(() => {
    socket.on(NEW_MESSAGE_ALERT, newMessageAlertFun);
    return () => {
      socket.off(NEW_MESSAGE_ALERT, newMessageAlertFun);
    };
  }, [newMessageAlertFun, socket]);
  const refetchData = useCallback(
    (data) => {
      if (
        data.type === "CHAT" ||
        data?.chatId === chatId ||
        data.type === "DELETE"
      ) {
        getInitialData();
        navigate("/home");
      } else if (data?.type === "UNFRIEND") {
        if (data?.chatId !== chatId) getInitialData();
      }
    },
    [navigate, chatId]
  );
  useEffect(() => {
    socket.on(REFETCH_DATA, refetchData);
    return () => {
      socket.off(REFETCH_DATA, refetchData);
    };
  }, [refetchData, socket]);
  return (
    <div>
      <Header />
      {isMobile && (
        <Drawer
          open={isMobile}
          onClose={closeDrawerHandler}
          sx={{
            display: {
              sm: isMobile ? "none" : "block",
            },
          }}
        >
          <ChatList
            w="70vw"
            chat={chat || []}
            chatId={params?.chatId}
            newMessageAlert={newMessageAlert}
          />
        </Drawer>
      )}
      <div>
        <Grid container height={"90vh"}>
          <Grid item sm={4} md={4} lg={3} display={{ xs: "none", sm: "block" }}>
            <ChatList
              w="100%"
              chat={chat || []}
              chatId={params?.chatId}
              newMessageAlert={newMessageAlert}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={8} lg={9}>
            <>{component}</>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Wrapper;
