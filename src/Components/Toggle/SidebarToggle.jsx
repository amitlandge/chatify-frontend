import { Drawer, Stack } from "@mui/material";
import Sidebar from "../Admin/Sidebar";

const SidebarToggle = (prop) => {
  const { open, onclose } = prop;
  return (
    <Drawer open={open} onClose={onclose}>
      <Stack width={"50vw"}>
        <Sidebar />
      </Stack>
    </Drawer>
  );
};

export default SidebarToggle;
