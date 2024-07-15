import { Stack, Typography } from "@mui/material";
import Avtar from "../Layout/Avtar";
import { Link, useSearchParams } from "react-router-dom";

const GroupItem = (prop) => {
  const { groups } = prop;
  const param = useSearchParams()[0].get("group");

  return (
    <Link
      to={`?group=${groups._id}`}
      onClick={(e) => {
        if (groups._id === param) {
          e.preventDefault();
        }
      }}
    >
      <Stack
        direction={"row"}
        spacing={"5px"}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",

          background:
            groups._id === param
              ? "radial-gradient(circle at 10% 20%, rgb(98, 114, 128) 0%, rgb(52, 63, 51) 90.1%)"
              : "unset",
          color: groups._id === param ? "white" : "unset",
          position: "relative",
          padding: "1rem 2rem",
        }}
      >
        <Avtar avatar={groups?.avatar} />
        <Typography>{groups.name}</Typography>
      </Stack>
    </Link>
  );
};

export default GroupItem;
