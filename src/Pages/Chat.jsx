import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Wrapper from "../Components/Layout/Wrapper";
import { Box, IconButton, Stack, TextField } from "@mui/material";
import { AttachFile, EmojiEmotions, MoreVert, Send } from "@mui/icons-material";

import MessageComponent from "../Components/Message/MessageComponent";
import { getSocket } from "../context/getSocket";
import "./Chat.css";
import {
  CHAT_JOINED,
  CHAT_LEAVE,
  NEW_MESSAGE,
  TYPING_START,
  TYPING_STOP,
} from "../constants/eventConstant";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../utils/config";

import { useDispatch, useSelector } from "react-redux";
import { getMyChatDeails } from "../redux/reducers/chatDetails";

import { clearNewMessageAlert } from "../redux/reducers/message";
import FileMenu from "../Components/Toggle/FileMenu";
import {
  setDeleteMenu,
  setEmojiPicker,
  setIsFileMenu,
} from "../redux/reducers/misc";
import TypingLoader from "../Components/Layout/TypingLoader";
import EmojiPicker from "../Components/Toggle/EmojiPicker";
import DeleteChat from "../Components/Toggle/DeleteChat";

import { useInfiniteScrollTop } from "6pp";
import toast from "react-hot-toast";

import useEvents from "../Hooks/eventHook";
import chatBackground from "../assets/chat.jpg";
import { SymbolColor } from "../Style/Style";
const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = getSocket();
  const [message, setMessage] = useState("");
  const [messageData, setMessageData] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [chatAnchor, setChatAnchor] = useState(null);
  const params = useParams();
  let chatId = params?.chatId;
  const { chatDetails } = useSelector((state) => state.chatDetails);
  const { emojiPicker, isDeleteMenu } = useSelector((state) => state.misc);
  const { user } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [oldMessageData, setOldMessageData] = useState({
    chats: [],
    totalPages: 1,
  });

  const chatContainerRef = useRef(null);
  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const [error, setError] = useState(false);
  const typingTimeout = useRef(null);
  const bottomRef = useRef();

  const getChatDetails = async () => {
    try {
      const res = await axios.get(`${server}/api/v1/chat/${chatId}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(getMyChatDeails(res?.data?.chats));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something Went Wrong");
      setError(true);
    }
  };

  useEffect(() => {
    getChatDetails();
    if (error) {
      navigate("/home");
    }
  }, [chatId, navigate, error]);

  useEffect(() => {
    dispatch(clearNewMessageAlert(chatId));
  }, [chatId, dispatch]);

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    chatContainerRef,
    oldMessageData?.totalPages,
    page,
    setPage,
    oldMessageData?.chats
  );

  useEffect(() => {
    getMessageHandler();
  }, [page, chatId]);
  const getMessageHandler = async () => {
    try {
      const res = await axios.get(
        `${server}/api/v1/message/${chatId}?page=${page}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        const data = res.data;

        setOldMessageData(data);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const messageListener = useCallback(
    (data) => {
      if (data?.chatId !== chatId) {
        return;
      }
      setMessageData((prev) => {
        return [...prev, data.message];
      });
    },
    [chatId]
  );

  const sendMessageHandler = () => {
    if (!message.trim()) {
      return;
    }
    socket.emit(NEW_MESSAGE, {
      chatId: chatId,
      message,
      memebers: chatDetails.memebers,
    });

    setMessage("");
  };

  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user?._id, members });

    return () => {
      setMessage("");
      setOldMessages([]);
      setMessageData([]);
      setOldMessageData({ chats: [], totalPages: 1 });
      setPage(1);
      socket.emit(CHAT_LEAVE, { userId: user?._id, members });
    };
  }, [chatId]);

  const openAttachments = (e) => {
    dispatch(setIsFileMenu(true));
    setAnchorEl(e.currentTarget);
  };
  const members = chatDetails?.members;
  const messageTyping = (e) => {
    setMessage(e.target.value);
    const filterMember = members.filter((mem) => {
      return mem.toString() !== user._id.toString();
    });

    socket.emit(TYPING_START, { chatId, members: filterMember });
    if (!IamTyping) {
      socket.emit(TYPING_START, { members: filterMember, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(TYPING_STOP, { members: filterMember, chatId });
      setIamTyping(false);
    }, [2000]);
  };

  const setTyping = useCallback(
    (data) => {
      if (data.chatId !== chatId) {
        return;
      }
      setUserTyping(true);
    },
    [chatId]
  );
  const stopTyping = useCallback(
    (data) => {
      if (data.chatId !== chatId) {
        return;
      }
      setUserTyping(false);
    },
    [chatId]
  );

  let allMessages = [...oldMessages, ...messageData] || [];

  const openEmojiPicker = () => {
    dispatch(setEmojiPicker(true));
  };
  const closeEmojiPicker = () => {
    dispatch(setEmojiPicker(false));
  };

  const emojiPickerHandler = (emoji) => {
    setMessage(message + emoji.native);
  };

  const openChatMenu = (e) => {
    setChatAnchor(e.currentTarget);

    dispatch(setDeleteMenu(true));
  };

  const eventHandler = {
    [NEW_MESSAGE]: messageListener,
    [TYPING_START]: setTyping,
    [TYPING_STOP]: stopTyping,
  };
  useEvents(socket, eventHandler);

  useEffect(() => {
    scrollBottom();
  }, [messageData, chatId]);

  const scrollBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Wrapper>
        <Suspense fallback={<p>Loading...</p>}>
          <Stack
            ref={chatContainerRef}
            className="chat-container"
            boxSizing={"border-box"}
            height={"82vh"}
            padding={"1rem"}
            spacing={"1rem"}
            bgcolor={chatBackground}
            sx={{
              overflowX: "hidden",
              overflowY: "auto !important",
            }}
          >
            {allMessages?.map((message) => (
              <MessageComponent
                key={message._id}
                message={message || []}
                user={{ _id: user._id, name: user.name }}
              />
            ))}
            <div ref={bottomRef} />

            {userTyping && <TypingLoader text="Typing" />}
          </Stack>

          <Box
            width={"100%"}
            height={"10%"}
            position={"relative"}
            top={"0"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1vmax",
            }}
          >
            <IconButton onClick={openChatMenu}>
              <MoreVert sx={{ ...SymbolColor }} />
            </IconButton>
            <IconButton onClick={openAttachments}>
              <AttachFile sx={{ ...SymbolColor }} />
            </IconButton>
            <IconButton onClick={openEmojiPicker}>
              <EmojiEmotions sx={{ ...SymbolColor }} />
            </IconButton>
            <TextField
              type="text"
              variant="standard"
              sx={{
                width: "80%",
                border: "none",
                padding: "1rem",
                outline: "none",
              }}
              placeholder="Enter Your Message"
              value={message}
              onChange={(e) => {
                messageTyping(e);
              }}
            />
            <IconButton onClick={sendMessageHandler}>
              <Send
                sx={{
                  width: "2.5rem",
                  height: "2.5rem",
                  background: "#006A4E",
                  color: "white",
                  borderRadius: "50%",
                  padding: "0.5rem",
                  rotate: "-30deg",
                  cursor: "pointer",
                }}
              />
            </IconButton>
          </Box>
        </Suspense>
      </Wrapper>
      <FileMenu anchorEl={anchorEl} chatId={params.chatId} />
      <EmojiPicker
        emojiOpen={emojiPicker}
        onClose={closeEmojiPicker}
        selectedEmoji={emojiPickerHandler}
      />

      <DeleteChat
        open={isDeleteMenu}
        anchorEl={chatAnchor}
        chatDetails={chatDetails}
      />
    </div>
  );
};

export default Chat;
