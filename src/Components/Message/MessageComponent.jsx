import { Box, Typography } from "@mui/material";
import moment from "moment";
import RenderAttchments from "./RenderAttchments";
import { checkExtention } from "../../utils/features";
import { animated, useSpring } from "@react-spring/web";
import "./Message.css";

const MessageComponent = (prop) => {
  const { sender, content, attachments, createdAt } = prop.message;
  const { user } = prop;
 
  const spring = useSpring({
    from: {
      y: "-100%",
      opacity: "0",
    },
    to: {
      y: "0%",
      opacity: "1",
    },
  });
  return (
    <animated.div
      style={{
        ...spring,
      }}
      className={sender?._id === user?._id ? "sender" : "reciver"}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            attachments?.length > 1
              ? "repeat(2, minmax(150px, 1fr))"
              : "repeat(minmax(150px, 1fr))",
          gridGap: "1rem",
        }}
      >
        {attachments &&
          attachments.map((item, index) => {
            const url = item.url;
            const file = checkExtention(url);
            return (
              <Box key={index}>
                <a target="_blank" href={url} download={true}>
                  <RenderAttchments url={url} file={file} />
                </a>
              </Box>
            );
          })}
      </Box>
      <Typography
        variant="caption"
        style={{
          alignSelf: sender?._id === user?._id ? "flex-end" : "flex-start",
          display: "block",
        }}
      >
        {sender?._id === user?._id ? "You" : sender?.name}
      </Typography>
      <Typography
        variant="p"
        sx={{
          width: "fit-content",
          display: "block",
          alignSelf: sender?._id === user?._id ? "flex-end" : "flex-start",
        }}
      >
        {content}
      </Typography>
      <Typography
        variant="caption"
        color={"text.primary"}
        style={{
          alignSelf: "flex-end",
          display: "block",
        }}
      >
        {moment(createdAt).fromNow(true)}
      </Typography>
    </animated.div>
  );
};

export default MessageComponent;
