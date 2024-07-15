import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../utils/config";
import toast from "react-hot-toast";

const useGetData = (url) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const getInitialData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${server}/${url}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setLoading(false);

        setData(res.data);
      }
      return res;
    } catch (error) {
      setLoading(false);
      setData(null);
      toast.error(error.response?.data?.message || "Something Went Wrong");
    }
  };
  useEffect(() => {
    getInitialData();
  }, []);
  return [loading, data, getInitialData];
};
export { useGetData };
