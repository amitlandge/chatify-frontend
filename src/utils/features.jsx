import moment from "moment";

export const checkExtention = (url) => {
  const fileExtention = url.split(".").pop();
  if (
    fileExtention === "mp4" ||
    fileExtention === "webm" ||
    fileExtention === "ogg"
  ) {
    return "video";
  }
  if (fileExtention === "mp3" || fileExtention === "wav") {
    return "audio";
  }
  if (
    fileExtention === "png" ||
    fileExtention === "jpg" ||
    fileExtention === "jpeg" ||
    fileExtention === "gif"
  ) {
    return "image";
  }
  return "file";
};

export const transFormUrl = (url = "") => url;

export const getMessageAlertLocalStorage = (data, method = "") => {
  const setData = localStorage.getItem("newMessageAlert");

  if (method === "GET") {
    if (setData) {
      const parse = JSON.parse(setData);
      return parse;
    } else {
      return null;
    }
  } else {
    localStorage.setItem("newMessageAlert", JSON.stringify(data));
  }
};
export const getLast7Days = () => {
  const currentDate = moment();

  const last7Days = [];

  for (let i = 0; i < 7; i++) {
    const dayDate = currentDate.clone().subtract(i, "days");
    const dayName = dayDate.format("dddd");

    last7Days.unshift(dayName);
  }

  return last7Days;
};
