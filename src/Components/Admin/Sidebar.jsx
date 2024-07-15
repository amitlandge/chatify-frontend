import {
  ArrowBack,
  ChatBubble,
  Dashboard,
  Groups,
  Message,
} from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
const SidebarLinks = [
  {
    url: "/admin/dashboard",
    name: "Dashboard",
    icon: <Dashboard />,
  },
  {
    url: "/admin/users",
    name: "Users",
    icon: <Groups />,
  },
  {
    url: "/admin/chats",
    name: "Chats",
    icon: <ChatBubble />,
  },
  {
    url: "/admin/messages",
    name: "Messages",
    icon: <Message />,
  },
];
const Sidebar = () => {
  const location = useLocation();

  const navigate = useNavigate();
  return (
    <div>
      <Stack direction={"column"} spacing={"2rem"} padding={"2rem"}>
        <Typography
          variant="h5"
          sx={{
            fontSize: "2vmax",
            letterSpacing: "4px",
            fontFamily: "Lobster, sans-serif",
            color: "green",
          }}
        >
          Chatify
        </Typography>
        <Stack alignItems={"flex-start"} spacing={"1rem"}>
          {SidebarLinks &&
            SidebarLinks.map((item) => {
              return (
                <Link
                  to={item.url}
                  key={item.name}
                  style={
                    location.pathname === item.url
                      ? {
                          background: "green",
                          color: "white",
                          display: "flex",
                          justifyContent: "center",
                          gap: "0.5rem",
                          padding: "1rem 2rem",
                          borderRadius: "3rem",
                        }
                      : {
                          display: "flex",
                          justifyContent: "center",
                          gap: "0.5rem",
                          padding: "1rem 2rem",
                          borderRadius: "3rem",
                        }
                  }
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}

          <Button
            variant="text"
            sx={{ color: "black", padding: "1rem 2rem" }}
            startIcon={<ArrowBack />}
            onClick={() => {
              navigate("/home");
            }}
          >
            Go Back
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default Sidebar;
