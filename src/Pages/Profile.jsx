import {
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Container,
  Button,
  Box,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import { useSelector } from "react-redux";
import { ArrowCircleLeft, CalendarMonth, Info } from "@mui/icons-material";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            width: "7rem",
            height: "7rem",
            margin: "auto",
            marginBottom: 2,
          }}
          alt="User Avatar"
          src={user?.avatar}
        />
        <Typography variant="h6" textAlign={"center"}>
          {user?.name}
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <PersonIcon sx={{ color: "green" }} />
            </ListItemIcon>
            <ListItemText primary="Username" secondary={user?.username} />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Info sx={{ color: "green" }} />
            </ListItemIcon>
            <ListItemText primary="Bio" secondary={user?.bio} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CalendarMonth sx={{ color: "green" }} />
            </ListItemIcon>
            <ListItemText
              primary="Joined"
              secondary={moment(user?.createdAt).fromNow(true)}
            />
          </ListItem>
          <ListItem>
            <Button
              startIcon={<ArrowCircleLeft />}
              variant="contained"
              sx={{
                textAlign: "center",
                margin: "0 auto",
                background: "green",
                ":hover": {
                  background: "green",
                },
              }}
              onClick={() => {
                navigate("/home");
              }}
            >
              Go Back
            </Button>
          </ListItem>
        </List>
      </Container>
    </Box>
  );
};

export default Profile;
