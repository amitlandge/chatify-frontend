import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { server } from "../utils/config";
import { isAuthenticated, isNotAuthenticated } from "../redux/reducers/auth";

const useMyProfile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    loadUser();
  }, [dispatch]);
  const loadUser = async () => {
    axios
      .get(`${server}/api/v1/user/myprofile`, { withCredentials: true })
      .then((res) => {
        dispatch(isAuthenticated(res.data.user));
      })
      .catch(() => {
        dispatch(isNotAuthenticated());
      });
  };
  return [loadUser];
};
export default useMyProfile;
