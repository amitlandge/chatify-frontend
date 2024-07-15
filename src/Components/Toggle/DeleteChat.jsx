import { Delete, PersonRemove } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, MenuList } from "@mui/material";
import { useDispatch } from "react-redux";
import { setDeleteMenu } from "../../redux/reducers/misc";

import { useNavigate, useParams } from "react-router-dom";
import usePutPost from "../../Hooks/usePutPost";

const DeleteChat = (prop) => {
  const param = useParams();
  const chatId = param.chatId;
  const [, putPostMethod] = usePutPost();

  console.log(prop.anchorEl);
  const navigate = useNavigate();
  const chatDetails = prop.chatDetails;
  console.log(chatDetails);
  const dispatch = useDispatch();
  const oncloseMenu = () => {
    dispatch(setDeleteMenu(false));
  };
  const deleteChatHandler = async () => {
    const data = {
      method: "DELETE",
      url: `api/v1/message/${chatId}`,
      message: "Delete Chat Successfully",
    };
    const res = await putPostMethod(data);
    if (res.status === 200) {
      dispatch(setDeleteMenu(false));
      navigate("/");
    }
  };

  const unfriendAndDeleteChat = async () => {
    const data = {
      method: "DELETE",
      url: `api/v1/chat/unfriend/${chatId}`,

      message: "Remove Friend Successfully",
    };
    const res = await putPostMethod(data);
    if (res.status === 200) {
      dispatch(setDeleteMenu(false));
    }
  };
  return (
    <Menu open={prop.open} anchorEl={prop.anchorEl} onClose={oncloseMenu}>
      <MenuList>
        <MenuItem
          onClick={() => {
            deleteChatHandler();
          }}
        >
          <IconButton>
            <Delete />
          </IconButton>
          Delete Chat
        </MenuItem>
        <>
          {!chatDetails?.groupChat && (
            <MenuItem
              onClick={() => {
                unfriendAndDeleteChat();
              }}
            >
              <IconButton>
                <PersonRemove />
              </IconButton>
              Unfriend
            </MenuItem>
          )}
        </>
      </MenuList>
    </Menu>
  );
};

export default DeleteChat;
