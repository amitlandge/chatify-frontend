import { Avatar, Box, Stack } from "@mui/material";
import ProfileCard from "./ProfileCard";
import { CalendarMonth, Description, Face } from "@mui/icons-material";
import moment from "moment";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <Stack alignItems={"center"} justifyContent={"center"} color={"white"}>
        <Avatar
          src={
            user
              ? user.avatar.url
              : "https://www.w3schools.com/howto/img_avatar.png"
          }
          sx={{
            width: 200,
            height: 200,
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <ProfileCard
            title={"Bio"}
            description={user.bio}
            icon={<Description />}
          />
          <ProfileCard title={"Name"} description={user.name} icon={<Face />} />
          <ProfileCard
            title={"Joined"}
            description={moment(user.createdAt).fromNow()}
            icon={<CalendarMonth />}
          />
        </Box>
      </Stack>
    </div>
  );
};

export default Profile;
