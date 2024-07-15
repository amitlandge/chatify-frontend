import AdminLayout from "../Layout/AdminLayout";
import { Avatar } from "@mui/material";

import Table from "./Table/Table";
import { Stack } from "@mui/material";
import { useGetData } from "../../Hooks/useGetData";
const column = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-heading",
    width: "200",
  },
  {
    field: "attachment",
    headerName: "Attachment",
    headerClassName: "table-heading",
    renderCell: (params) => <Avatar src={params.row.avatar} />,

    width: "200",
  },

  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-heading",
    width: "400",
  },
  {
    field: "sender",
    headerName: "Send By",
    headerClassName: "table-heading",
    renderCell: (params) => {
      return (
        <Stack direction={"row"} alignItems={"center"} spacing={"4"}>
          <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
          <span>{params?.row?.sender?.name}</span>
        </Stack>
      );
    },

    width: "400",
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-heading",
    width: "220",
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-heading",
    width: "100",
  },
];
const AdminMessages = () => {
  const [, data] = useGetData("admin/getAllMessages");

  const filterArray = data?.messages?.map((messages) => ({
    ...messages,
    id: messages._id,
    content: messages.content,
    sender: {
      name: messages?.sender?.name,
      id: messages.sender._id,
      avatar: messages.sender.avatar,
    },
    chat: messages?.chatId,
  }));

  return (
    <div>
      <AdminLayout>
        <Table columns={column} heading={"All Users"} rows={filterArray} />
      </AdminLayout>
    </div>
  );
};

export default AdminMessages;
