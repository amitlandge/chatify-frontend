import AdminLayout from "../Layout/AdminLayout";
import { Avatar } from "@mui/material";

import Table from "./Table/Table";
import { useGetData } from "../../Hooks/useGetData";
const column = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-heading",
    width: "200",
  },
  {
    field: "avatar",
    headerName: "Aavtar",
    headerClassName: "table-heading",
    renderCell: (params) => <Avatar src={params.row.avatar} />,

    width: "150",
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-heading",
    width: "150",
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-heading",
    width: "200",
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-heading",
    width: "150",
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-heading",
    width: "150",
  },
];
const AdminUsers = () => {
  const [, data] = useGetData("admin/getAllUsers");
  const filterArray = data?.users?.map((user) => ({ ...user, id: user._id }));

  return (
    <div>
      <AdminLayout>
        <Table columns={column} heading={"All Users"} rows={filterArray} />
      </AdminLayout>
    </div>
  );
};

export default AdminUsers;
