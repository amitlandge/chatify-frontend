import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import { useGetData } from "../../Hooks/useGetData";
import { LoaderSpinner } from "../Layout/Loader";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import usePutPost from "../../Hooks/usePutPost";
import { myFriends } from "../../redux/reducers/auth";
import { StyledButton } from "../../Style/GridStyle";
const AddGroupToggle = (prop) => {
  const [groupName, setGroupName] = useState("");
  const [loader, putPostMethod] = usePutPost();
  const [addedUser, setAddedUser] = useState([]);
  const dispatch = useDispatch();
  const [, data] = useGetData("api/v1/user/getMyFriends");

  dispatch(myFriends(data?.myFriends));
  dispatch;
  const { friends } = useSelector((state) => state.auth);
  const handleCreateGroup = async () => {
    console.log("Created group:", { groupName });

    prop.onClose();
    if (groupName.trim().length === 0) {
      toast.error("Group name is invalid");
      return;
    }
    if (addedUser.length < 2) {
      toast.error("Member Must be 2 or More");
      return;
    }
    const data = {
      method: "POST",
      url: `api/v1/chat/createGroup`,
      payload: {
        members: addedUser,
        name: groupName,
      },
      message: "Create Group Successfully",
    };
    await putPostMethod(data);
  };

  const handleClose = () => {
    prop.onClose();
  };
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

  return (
    <>
      {loader ? (
        <LoaderSpinner />
      ) : (
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            sx={{ width: 500, margin: "0 auto" }}
          >
            <DialogTitle>Create Group</DialogTitle>
            <DialogContent
              sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <TextField
                label="Group Name"
                variant="outlined"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </DialogContent>
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0rem 2rem",
              }}
            >
              {friends?.map((user) => (
                <ListItem
                  key={user._id}
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
                    <Avatar src={user?.avatar}></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user?.name}
                    secondary={user?.name && user?.username}
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
                      addUserHandler(user._id);
                    }}
                  >
                    {addedUser.includes(user._id) ? (
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
              ))}
            </List>
            <DialogActions sx={{ marginTop: "2rem" }}>
              <Button onClick={handleClose} color="error">
                Cancel
              </Button>
              <StyledButton
                onClick={handleCreateGroup}
                color="primary"
                variant="contained"
              >
                Create
              </StyledButton>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default AddGroupToggle;
