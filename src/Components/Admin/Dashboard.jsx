import { Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import AdminLayout from "../Layout/AdminLayout";
import {
  Close,
  Group,
  Groups,
  Menu,
  Message,
  Search,
} from "@mui/icons-material";
import { useState } from "react";
import SidebarToggle from "../Toggle/SidebarToggle";
import moment from "moment";
import { DonutChart, LineChart } from "./Chart";
import { useGetData } from "../../Hooks/useGetData";

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [, data] = useGetData("admin/stats");
  const stats = data?.stats;
  console.log(data);
  console.log(stats?.ChatCount, stats?.GroupChats);
  console.log(stats?.messages);
  const openSidebarMenu = () => {
    setIsMobile(true);
  };
  const oncloseSidebar = () => {
    setIsMobile(false);
  };
  const IconMenu = (
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
        onClick={openSidebarMenu}
      >
        {isMobile ? <Close /> : <Menu />}
      </IconButton>
    </>
  );
  const paperStyled = {
    padding: "1rem 4rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
  };
  const boxStyled = {
    width: "4rem",
    height: "4rem",
    borderRadius: "50%",
    border: "5px solid green",
    textAlign: "center",
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
    justifyContent: "center",

  };
  return (
    <div>
      <AdminLayout>
        <div>
          {IconMenu}
          {isMobile && (
            <SidebarToggle open={isMobile} onclose={oncloseSidebar} />
          )}
          <Stack padding={"2rem"}>
            <Stack>
              <Paper
                elevation={4}
                sx={{
                  padding: "1rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <Group />
                <input
                  type="text"
                  placeholder="Search"
                  style={{
                    width: "20vmax",
                    padding: "0.6rem 2rem",
                    border: "none",
                    outline: "none",
                  }}
                />
                <Button
                  sx={{
                    background: "green",
                    color: "white",
                    borderRadius: "2rem",
                    padding: "0.5rem",
                    display: "flex",
                    justifyContent: "center",
                    ":hover": {
                      background: "green",
                      color: "white",
                    },
                    marginRight: "auto",
                  }}
                  startIcon={<Search />}
                ></Button>
                <Typography variant="caption">
                  {moment().format("ddd mm yyyy")}
                </Typography>
              </Paper>
            </Stack>
          </Stack>
          <Stack
            padding={"1rem"}
            width={"90%"}
            margin={"2rem auto"}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-around"}
            flexWrap={"wrap"}
            sx={{
              flexDirection: {
                sm: "row",
                xs: "column",
              },
              gap: "2rem",
            }}
          >
            <Paper
              sx={{
                width: {
                  sm: "55%",
                  xs: "80%",
                },
              }}
            >
              <Typography variant="h5">Last Messages</Typography>
              <LineChart value={stats?.messages} />
            </Paper>
            <Paper
              style={{ padding: "1rem" }}
              elevation={3}
              // sx={{ width: "40%" }}
              sx={{
                width: {
                  sm: "40%",
                  xs: "80%",
                },
              }}
            >
              <DonutChart
                labels={["Single Chats", "Group Chats"]}
                value={[
                  stats?.ChatCount - stats?.GroupChats || 0,
                  stats?.GroupChats || 0,
                ]}
              />
            </Paper>
          </Stack>
          {/* <Stack padding={"1rem"} width={"60%"} margin={"2rem auto"}></Stack> */}
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-around"}
            marginBottom={"3rem"}
          >
            <Paper elevation={3} sx={{ ...paperStyled }}>
              <Typography sx={boxStyled}>{stats?.UserCount || 0}</Typography>
              <Group />
              <Typography>Users</Typography>
            </Paper>
            <Paper elevation={3} sx={{ ...paperStyled }}>
              <Typography sx={boxStyled}>{stats?.GroupChats || 0}</Typography>
              <Groups />
              <Typography>Groups</Typography>
            </Paper>
            <Paper elevation={3} sx={{ ...paperStyled }}>
              <Typography sx={boxStyled}>{stats?.MessageCount || 0}</Typography>
              <Message />
              <Typography>Messages</Typography>
            </Paper>
          </Stack>
        </div>
      </AdminLayout>
    </div>
  );
};

export default Dashboard;
