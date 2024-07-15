import { Box, Stack } from "@mui/material";
import ChatItem from "./ChatItem";
import { useCallback, useEffect, useState } from "react";
import { getSocket } from "../../context/getSocket";
import { ONLINE_USERS } from "../../constants/eventConstant";

const ChatList = (prop) => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  const socket = getSocket();
  const {
    chat = [],
    chatId,

    newMessageAlert = [
      {
        chatId: "",
        count: 0,
      },
    ],
  } = prop;

  const onlineUsersHandler = useCallback((data) => {
    setOnlineUsers(data);
  }, []);
  useEffect(() => {
    socket.on(ONLINE_USERS, onlineUsersHandler);
    return () => {
      socket.off(ONLINE_USERS, onlineUsersHandler);
    };
  }, [onlineUsersHandler, socket]);

  return (
    <div>
      <Stack
        width={"100%"}
        sx={{
          height: "91vh",
          overflowY: "auto",
          background: "rgba(226,223,210,0.6)",
        }}
      >
        {chat.length === 0 ? (
          <Box sx={{ textAlign: "center", margin: "1rem" }}>No Chats</Box>
        ) : (
          chat?.map((item, index) => {
            const { _id, name, groupChat, members, avatar } = item;
            const newMessage = newMessageAlert.find(({ chatId }) => {
              return chatId === _id;
            });
            const isOnline = members.some((mem) => onlineUsers.includes(mem));

            return (
              <ChatItem
                key={index}
                newMessageAlert={newMessage}
                isOnline={isOnline}
                chatId={chatId}
                name={name}
                _id={_id}
                index={index}
                avatar={avatar}
                sameSender={chatId == _id}
                groupChat={groupChat}
                members={members}
              />
            );
          })
        )}
      </Stack>
    </div>
  );
};

export default ChatList;
