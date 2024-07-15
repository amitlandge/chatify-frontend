import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import GroupItem from "./GroupItem";
import { animated, useSpring } from "@react-spring/web";
const GroupList = (prop) => {
  const { width, groups = [] } = prop;
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
    <animated.div style={{ ...spring }}>
      <Stack
        width={width}
        sx={{
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {groups.length > 0 ? (
          groups.map((item, index) => {
            return <GroupItem key={index} groups={item} />;
          })
        ) : (
          <Typography
            sx={{
              textAlign: "center",
              margin: "1rem",
            }}
          >
            No Group{" "}
          </Typography>
        )}
      </Stack>
    </animated.div>
  );
};

export default GroupList;
