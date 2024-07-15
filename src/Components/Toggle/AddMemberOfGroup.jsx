import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from "@mui/material";

import { useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import { useSearchParams } from "react-router-dom";
import usePutPost from "../../Hooks/usePutPost";
import { useGetData } from "../../Hooks/useGetData";
import { myFriends } from "../../redux/reducers/auth";
import { StyledButton } from "../../Style/GridStyle";

const AddMemberOfGroup = (prop) => {
  const { onclose } = prop;
  const { friends } = useSelector((state) => state.auth);
  const param = useSearchParams()[0].get("group");
  const [addedUser, setAddedUser] = useState([]);
  const [, putPostMethod] = usePutPost();
  const [, data] = useGetData("api/v1/user/getMyFriends");
  const dispatch = useDispatch();
  dispatch(myFriends(data?.myFriends));
  const addUserHandler = (id) => {
    setAddedUser((prev) => {
      let myFilterArray;

      if (prev.includes(id)) {
        myFilterArray = prev.filter((item) => item !== id);
        return myFilterArray;
      } else {
        myFilterArray = [...prev, id];
        return myFilterArray;
      }
    });
  };
  const onAddMembers = async () => {
    const data = {
      method: "PUT",
      url: `api/v1/chat/addMember`,
      payload: {
        chatId: param,
        members: addedUser,
      },
      message: "Add Member Successfully",
    };
    const res = await putPostMethod(data);
    if (res.status === 200) {
      prop.onclose();
    }
  };
  return (
    <Dialog
      open={prop.open}
      sx={{ width: 500, margin: "0 auto" }}
      onClose={onclose}
    >
      <Stack>
        <DialogTitle> Add Member</DialogTitle>
        <Stack spacing={"3rem"} padding={"1rem"} textAlign={"center"}>
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "0rem 3rem",
            }}
          >
            {friends &&
              friends?.map((item, index) => {
                return (
                  <ListItem
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.5rem 1rem",
                      boxShadow: "0px 3px 4px gray",
                      borderRadius: "5px",
                      marginTop: "1.5rem",
                      gap: "1rem",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar src={item?.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item?.name}
                      sx={{
                        width: "4rem",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    />
                    <Button
                      variant="text"
                      onClick={() => {
                        addUserHandler(item._id);
                      }}
                    >
                      {addedUser.includes(item._id) ? (
                        <Remove
                          sx={{
                            width: "2rem",
                            height: "2rem",
                            padding: "4px",
                            background: "red",
                            borderRadius: "50%",
                            color: "white",
                            cursor: "pointer",
                          }}
                        />
                      ) : (
                        <Add
                          sx={{
                            width: "2rem",
                            height: "2rem",
                            padding: "4px",
                            background: "#006A4E",
                            borderRadius: "50%",
                            color: "white",
                            cursor: "pointer",
                          }}
                        />
                      )}
                    </Button>
                  </ListItem>
                );
              })}
          </List>
          <Stack
            spacing={"1rem"}
            alignItems={"center"}
            direction={"row"}
            justifyContent={"center"}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                onclose();
              }}
            >
              Cancel
            </Button>
            <StyledButton
              variant="contained"
              onClick={onAddMembers}
              disabled={friends?.length === 0 ? true : false}
            >
              Submit Changes
            </StyledButton>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberOfGroup;
