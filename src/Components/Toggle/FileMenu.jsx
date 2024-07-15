import { IconButton, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu } from "../../redux/reducers/misc";
import { AudioFile, Image, UploadFile, VideoFile } from "@mui/icons-material";
import { useRef } from "react";
import toast from "react-hot-toast";

import usePutPost from "../../Hooks/usePutPost";

const FileMenu = (prop) => {
  const [, putPostMethod] = usePutPost();
  const dispatch = useDispatch();
  const { isFileMenu } = useSelector((state) => state.misc);
  const imageRef = useRef();
  const videoRef = useRef();
  const audioRef = useRef();
  const otherFileRef = useRef();
  const fileCloseHandler = () => {
    dispatch(setIsFileMenu(false));
  };
  const openImageMenu = () => {
    imageRef.current.click();
  };
  const openAudioMenu = () => {
    audioRef.current.click();
  };
  const openVideoMenu = () => {
    videoRef.current.click();
  };
  const otherFileMenu = () => {
    otherFileRef.current.click();
  };
  const sendFileAttchments = async (e, key) => {
    const files = Array.from(e.target.files);
  
    if (!files && files.length === 0) {
      toast.error(`Please Insert ${key}`);
    }
    if (files.length > 5) {
      toast.error("You Can't Send File more than 5");
    }
    const toastId = toast.loading(`${key} is Sending....`);
    const formData = new FormData();
    formData.append("chatId", prop.chatId);
    files.forEach((file) => formData.append("files", file));
 
    dispatch(setIsFileMenu(false));
    const data = {
      method: "POST",
      url: `api/v1/message/attachments`,
      payload: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await putPostMethod(data);
   
    if (res.status === 200) {
      toast.success(`${key} Send Successfully`, { id: toastId });
      dispatch(setIsFileMenu(false));
    }
  };
  return (
    <>
      <Menu
        anchorEl={prop.anchorEl}
        open={isFileMenu}
        onClose={fileCloseHandler}
      >
        <MenuList>
          <MenuItem>
            <Tooltip title="Select Images">
              <IconButton onClick={openImageMenu}>
                <Image sx={{ color: "green" }} />
                <input
                  type="file"
                  multiple
                  accept="image/png, image/jpeg"
                  style={{ display: "none" }}
                  ref={imageRef}
                  onChange={(e) => {
                    sendFileAttchments(e, "Images");
                  }}
                />
              </IconButton>
            </Tooltip>
          </MenuItem>
          <MenuItem>
            <Tooltip title="Select Audio">
              <IconButton onClick={openAudioMenu}>
                <AudioFile sx={{ color: "green" }} />
                <input
                  type="file"
                  multiple
                  accept="audio/mpeg,audio/ogg"
                  style={{ display: "none" }}
                  ref={audioRef}
                  onChange={(e) => {
                    sendFileAttchments(e, "Audio");
                  }}
                />
              </IconButton>
            </Tooltip>
          </MenuItem>
          <MenuItem>
            <Tooltip title="Select Video">
              <IconButton onClick={openVideoMenu}>
                <VideoFile sx={{ color: "green" }} />
                <input
                  type="file"
                  multiple
                  accept="video/ogg,video/mp4,video/webm"
                  style={{ display: "none" }}
                  ref={videoRef}
                  onChange={(e) => {
                    sendFileAttchments(e, "Video");
                  }}
                />
              </IconButton>
            </Tooltip>
          </MenuItem>
          <MenuItem>
            <Tooltip title="Select Other Files">
              <IconButton onClick={otherFileMenu}>
                <UploadFile sx={{ color: "green" }} />
                <input
                  type="file"
                  multiple
                  accept="*"
                  style={{ display: "none" }}
                  ref={otherFileRef}
                  onChange={(e) => {
                    sendFileAttchments(e, "File");
                  }}
                />
              </IconButton>
            </Tooltip>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default FileMenu;
