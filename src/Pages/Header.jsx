import {
  Group,
  GroupAdd,
  MenuOutlined,
  NotificationAdd,
  QuestionAnswer,
  Search,
} from "@mui/icons-material";
import "./Header.css";
import { Suspense, useState } from "react";
import AddGroupToggle from "../Components/Toggle/AddGroupToggle";
import NotificationsToggle from "../Components/Toggle/NotificationsToggle";
import SearchToggle from "../Components/Toggle/SearchToggle";
import {
  Avatar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
  setNavbarMenu,
} from "../redux/reducers/misc";
import NavbarToggle from "../Components/Toggle/NavbarToggle";
const Header = () => {
  const { isSearch, isNewGroup, isNotification, navbarMenu } = useSelector(
    (state) => state.misc
  );

  const { notifications } = useSelector((state) => state.chat);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSearchToggleHandler = () => {
    dispatch(setIsSearch(true));
  };
  const onNotificationHandler = () => {
    dispatch(setIsNotification(true));
  };
  const onGroupHandler = () => {
    dispatch(setIsNewGroup(true));
  };
  const closeSearchToggle = () => {
    dispatch(setIsSearch(false));
  };
  const closeNotification = () => {
    dispatch(setIsNotification(false));
  };
  const closeGroup = () => {
    dispatch(setIsNewGroup(false));
  };
  const manageGroupHandler = () => {
    navigate("/groups");
  };

  const openDrawer = () => {
    dispatch(setIsMobile(true));
  };
  const openMenuBar = (e) => {
    dispatch(setNavbarMenu(true));
    setAnchorEl(e.currentTarget);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.7rem 2rem",
          background: "#006A4E",
          color: "white",
          zIndex: 999,

          width: "100vw",
        }}
      >
        <IconButton
          sx={{
            color: "white",
            display: {
              xs: "block",
              sm: "none",
            },
            ":hover": {
              background: "green",
              color: "white",
            },
          }}
          onClick={openDrawer}
        >
          <MenuOutlined />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <QuestionAnswer
            sx={{
              fontSize: "1.8rem",
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontSize: "1.6rem",
              letterSpacing: "4px",
              fontFamily: "Lobster, sans-serif",
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            Chatify
          </Typography>
        </Box>
        <Stack direction={"row"} gap={"4vmax"}>
          <IconButton onClick={onSearchToggleHandler}>
            <Search sx={{ color: "white" }} />
          </IconButton>

          <IconButton onClick={onGroupHandler}>
            <GroupAdd sx={{ color: "white" }} />
          </IconButton>
          <IconButton onClick={manageGroupHandler}>
            <Group sx={{ color: "white" }} />
          </IconButton>
          <IconButton onClick={onNotificationHandler}>
            {notifications ? (
              <Badge badgeContent={" "} color="error" variant="dot">
                <NotificationAdd sx={{ color: "white" }} />
              </Badge>
            ) : (
              <NotificationAdd sx={{ color: "white" }} />
            )}
          </IconButton>

          <Box
            onClick={(e) => {
              openMenuBar(e);
            }}
            sx={{
              display: "flex",
              gap: "0.7rem",
              alignItems: "center",

              cursor: "pointer",
            }}
          >
            <Avatar src={user?.avatar} sx={{ width: "2rem", height: "2rem" }} />
            <Typography
              sx={{
                color: "white",
                width: "4rem",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {user?.name}
            </Typography>
          </Box>
        </Stack>
      </Box>
      {isNewGroup && (
        <Suspense fallback={<Backdrop open={true} />}>
          <AddGroupToggle onClose={closeGroup} />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<p>Loading...</p>}>
          <NotificationsToggle closeWindow={closeNotification} />
        </Suspense>
      )}
      {isSearch && (
        <Suspense fallback={<p>Loading...</p>}>
          <SearchToggle closeWindow={closeSearchToggle} />
        </Suspense>
      )}
      {navbarMenu && (
        <Suspense fallback={<p>Loading...</p>}>
          <NavbarToggle anchorEl={anchorEl} isOpen={navbarMenu} />
        </Suspense>
      )}
    </div>
  );
};

export default Header;
