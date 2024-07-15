import axios from "axios";
import { server } from "../utils/config";
import toast from "react-hot-toast";
import { useState } from "react";

const usePutPost = () => {
  const [loader, setLoader] = useState(false);

  const putPostMethod = async (data) => {
    try {
      setLoader(true);
      let res;
      if (data.method === "POST") {
        res = await axios.post(`${server}/${data?.url}`, data?.payload, {
          withCredentials: true,
          headers: data?.headers
            ? data?.headers
            : { "Content-Type": "application/json" },
        });
      } else if (data.method === "PUT") {
        res = await axios.put(`${server}/${data?.url}`, data?.payload, {
          withCredentials: true,
          headers: data?.headers
            ? data?.headers
            : { "Content-Type": "application/json" },
        });
      } else if (data.method === "DELETE") {
        res = await axios.delete(`${server}/${data?.url}`, {
          withCredentials: true,
          headers: data?.headers
            ? data?.headers
            : { "Content-Type": "application/json" },
        });
      }

      if (res.status === 200) {
        if (data?.message) {
          setLoader(false);
          toast.success(data?.message);
        }
      }
      return res;
    } catch (error) {
      setLoader(false);
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went Wrong");
    }
  };
  return [loader, putPostMethod];
};
export default usePutPost;
