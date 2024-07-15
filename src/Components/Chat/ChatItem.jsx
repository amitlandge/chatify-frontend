import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Avtar from "../Layout/Avtar";
import { animated, useSpring } from "@react-spring/web";

const ChatItem = (prop) => {
  const {
    avatar = [],
    name,
    _id,

    sameSender,
    isOnline = true,
    newMessageAlert,
  } = prop;
  const spring = useSpring({
    from: {
      x: "-100%",
      opacity: "0",
    },
    to: {
      x: "0%",
      opacity: "1",
    },
  });

  return (
    <Link to={`/chat/${_id}`}>
      <animated.div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignContent: "center",
          alignItems: "center",
          background: sameSender
            ? "radial-gradient(circle at 10% 20%, rgb(98, 114, 128) 0%, rgb(52, 63, 51) 90.1%)"
            : "unset",
          color: sameSender ? "white" : "unset",
          position: "relative",
          padding: "1rem 2rem",
          ...spring,
        }}
      >
        <Avtar avatar={avatar} />
        <Stack>
          <Typography variant="">{name}</Typography>
          {newMessageAlert && (
            <Typography>{newMessageAlert.count} New Message</Typography>
          )}
        </Stack>
        {isOnline && (
          <Typography
            sx={{
              width: "1rem",
              height: "1rem",
              borderRadius: "50%",
              background: "green",
              position: "absolute",
              top: "40%",
              right: "1rem",
            }}
          ></Typography>
        )}
      </animated.div>
    </Link>
  );
};

export default ChatItem;
