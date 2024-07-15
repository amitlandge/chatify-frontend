import { Avatar, Button } from "@mui/material";
import Table from "../Components/Admin/Table/Table";

import { useGetData } from "../Hooks/useGetData";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ArrowCircleLeft, Visibility } from "@mui/icons-material";
const Friends = () => {
  const navigate = useNavigate();
  const [, data] = useGetData("api/v1/user/getMyFriends");
  const { user } = useSelector((state) => state.auth);
  const column = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "table-heading",
      width: "250",
    },
    {
      field: "avatar",
      headerName: "Aavtar",
      headerClassName: "table-heading",
      renderCell: (params) => <Avatar src={params?.row?.avatar?.url} />,
      width: "100",
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "table-heading",
      width: "200",
    },
    {
      field: "actions",
      flex: 0.5,
      headerName: "Actions",
      headerClassName: "table-heading",
      minWidth: 150,
      type: "number",

      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Link to={`/friends/${params.id}`}>
              <Button>
                <Visibility />
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];

  const filterArray = user?.friends?.map((user) => ({ ...user, id: user._id }));

  return (
    <div
      style={{
        width: "70vw",
        margin: "0 auto",
      }}
    >
      <div>
        <Table
          columns={column}
          heading={"Friends"}
          rows={filterArray}
          height={"70vh"}
        />
      </div>
      <Button
        variant="text"
        sx={{
          display: "block",
          position: "absolute",
          top: "1rem",
          left: "1rem",
          textAlign: "center",
          margin: "0 auto",
        }}
        onClick={() => {
          navigate("/home");
        }}
      >
        <ArrowCircleLeft sx={{ color: "green", fontSize: "2.5rem" }} />
      </Button>
    </div>
  );
};

export default Friends;
