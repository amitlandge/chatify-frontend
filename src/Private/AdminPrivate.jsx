import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivate = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      {user?.role === "ADMIN" ? (
        <>
          <Outlet />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default AdminPrivate;
