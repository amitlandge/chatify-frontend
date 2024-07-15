import {
  ArrowCircleLeft,
  CalendarMonth,
  Info,
  Person,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { useGetData } from "../Hooks/useGetData";

const FriendProfile = () => {
  const param = useParams();
  const { uid } = param;
  const navigate = useNavigate();
  const [, data] = useGetData(`api/v1/user/friend/${uid}`);

  const user = data?.user;
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
          src={user?.avatar?.url}
        />
        <Typography variant="h6" textAlign={"center"}>
          {user?.name}
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <Person sx={{ color: "green" }} />
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
                navigate("/friends");
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

export default FriendProfile;
