import GroupList from "./GroupList";

import { useGetData } from "../../Hooks/useGetData";
import GroupDetails from "./GroupDetails";

import { Drawer, Grid, IconButton } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getSocket } from "../../context/getSocket";
import { REFETCH_DATA } from "../../constants/eventConstant";
import { KeyboardBackspace, Menu } from "@mui/icons-material";

const Group = () => {
  const socket = getSocket();
  const navigate = useNavigate();
  const [, data, getInitialData] = useGetData("api/v1/chat/myGroups");
  const param = useSearchParams()[0].get("group");
  const [isMobile, setIsMobile] = useState(false);
  const groups = data?.groups;
  const reRenderData = () => {
    getInitialData();
  };
  const refetchData = useCallback(() => {
    getInitialData();
  }, [param]);
  useEffect(() => {
    socket.on(REFETCH_DATA, refetchData);
    return () => {
      socket.off(REFETCH_DATA, refetchData);
    };
  }, [refetchData, socket]);
  const navigateToBack = () => {
    navigate("/");
  };
  const openDrawer = () => {
    setIsMobile((prev) => !prev);
  };
  const onCloseDrawerHandler = () => {
    setIsMobile(false);
  };
  const icons = (
    <>
      <IconButton
        sx={{
          color: "green",
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "2rem",
            top: "1rem",
          },
          ":hover": {
            background: "white",
            color: "green",
          },
        }}
        onClick={openDrawer}
      >
        <Menu />
      </IconButton>
      <IconButton
        sx={{
          width: "2rem",
          height: "2rem",
          padding: "1rem",
          background: "green",
          position: "absolute",
          top: "2rem",
          left: "2rem",
          color: "white",
          ":hover": {
            background: "green",
            color: "white",
          },
        }}
        onClick={navigateToBack}
      >
        <KeyboardBackspace />
      </IconButton>
    </>
  );
  return (
    <div>
      <Grid container spacing={3} height={"100vh"}>
        <Grid
          item
          sm={4}
          md={3}
          lg={4}
          sx={{
            display: {
              xs: "none",
              sm: "block",
              background: "rgb(226,223,210)",
            },
          }}
        >
          <GroupList width={"100%"} groups={groups} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          lg={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            padding: "3rem !important",
          }}
        >
          {param && <GroupDetails groups={groups} onClose={reRenderData} />}
          {icons}
        </Grid>
      </Grid>
      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
          width: "500px",
        }}
        open={isMobile}
        onClose={onCloseDrawerHandler}
      >
        <GroupList width={"50vw"} groups={groups} />
      </Drawer>
    </div>
  );
};

export default Group;
