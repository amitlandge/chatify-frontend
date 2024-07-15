import { Dashboard, Group, Logout, Person } from "@mui/icons-material";
import { Box, Menu, MenuItem, MenuList, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setNavbarMenu } from "../../redux/reducers/misc";
import axios from "axios";
import { server } from "../../utils/config";
import { isNotAuthenticated } from "../../redux/reducers/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const NavbarToggle = (prop) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const oncloseNavbarMenu = () => {
    dispatch(setNavbarMenu(false));
  };
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(isNotAuthenticated());
        toast.success("Logout Successfully");
        dispatch(setNavbarMenu(false));
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <div>
      <Menu
        anchorEl={prop.anchorEl}
        open={prop.isOpen}
        onClose={oncloseNavbarMenu}
        sx={{
          marginTop: "1rem",
          marginLeft: "1rem",
        }}
      >
        <MenuList
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            border: "none",
          }}
        >
          <MenuItem
            onClick={() => {
              navigate("/profile");
              dispatch(setNavbarMenu(false));
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Person sx={{ color: "green" }} />
              <Typography>Profile</Typography>
            </Box>
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate("/friends");
              dispatch(setNavbarMenu(false));
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Group sx={{ color: "green" }} />
              <Typography>Friends</Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={logoutHandler}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Logout sx={{ color: "green" }} />
              <Typography>Logout</Typography>
            </Box>
          </MenuItem>

          {user?.role === "ADMIN" && (
            <MenuItem
              onClick={() => {
                navigate("/admin/dashboard");
                dispatch(setNavbarMenu(false));
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Dashboard sx={{ color: "green" }} />
                <Typography>Dashboard</Typography>
              </Box>
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </div>
  );
};

export default NavbarToggle;
