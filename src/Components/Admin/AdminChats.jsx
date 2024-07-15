import AdminLayout from "../Layout/AdminLayout";
import { Stack } from "@mui/material";
import Avtar from "../../Components/Layout/Avtar";
import { Avatar } from "@mui/material";

import Table from "./Table/Table";
import { useGetData } from "../../Hooks/useGetData";
const column = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-heading",
    width: "300",
  },

  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-heading",
    width: "150",
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-heading",
    renderCell: (params) => {
      return (
        <Stack direction={"row"} alignItems={"center"} spacing={"2"}>
          <Avtar avatar={params?.row?.avatar} position="realtive" />
        </Stack>
      );
    },
    width: "300",
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-heading",
    width: "150",
  },

  {
    field: "totalMessages",
    headerName: "Total Message",
    headerClassName: "table-heading",
    width: "150",
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-heading",
    renderCell: (params) => {
      return (
        <Stack direction={"row"} alignItems={"center"} spacing={"2"}>
          <Avatar
            alt={params.row.creator.name}
            src={params.row.creator.avatar}
          />
          <span>{params.row.creator.name}</span>
        </Stack>
      );
    },
    width: "250",
  },
];
const AdminChats = () => {
  const [, data] = useGetData("admin/getAllChats");

  const filterArray = data?.chats?.map((chat) => ({
    ...chat,
    id: chat._id,
    avatar: chat?.members.map((avatar) => avatar),
  }));

  return (
    <div>
      <AdminLayout>
        <Table columns={column} heading={"All Chats"} rows={filterArray} />
      </AdminLayout>
    </div>
  );
};

export default AdminChats;
