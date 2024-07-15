import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";

const Avtar = (prop) => {
  const { avatar = [], position = "absolute" } = prop;
  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup max={3}>
        <Box width={"5rem"} height={"3rem"}>
          {avatar.map((item, index) => {
            return (
              <Avatar
                key={index}
                src={item}
                sx={{
                  width: "3rem",
                  height: "3rem",
                  position: position ? position : "absolute",
                  left: {
                    xs: `${0.5 + index}rem`,
                    sm: `${index}rem`,
                  },
                }}
              />
            );
          })}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default Avtar;
