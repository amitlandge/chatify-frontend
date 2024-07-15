import { Grid, IconButton, Menu } from "@mui/material";
import Sidebar from "../Admin/Sidebar";

const AdminLayout = (prop) => {
  const { children } = prop;
  const menuIcon = (
    <>
      <IconButton
        sx={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
        }}
      >
        <Menu />
      </IconButton>
    </>
  );
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Grid container height={"100vh"}>
        <Grid
          item
          lg={4}
          md={4}
          sm={4}
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        >
          <Sidebar />
        </Grid>
        <Grid item lg={8}>
          {children}
        </Grid>
      </Grid>
      {menuIcon}
    </div>
  );
};

export default AdminLayout;
