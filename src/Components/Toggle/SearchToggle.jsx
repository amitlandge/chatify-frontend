import { Add } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  ListItem,
  IconButton,
  Avatar,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import axios from "axios";

import { useCallback, useState } from "react";
import { server } from "../../utils/config";

import usePutPost from "../../Hooks/usePutPost";

const SearchToggle = (prop) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [, putPostMethod] = usePutPost();

  const handleSearch = useCallback(
    async (value) => {
      const res = await axios.get(`${server}/api/v1/user/?search=${value}`, {
        withCredentials: true,
      });

      setSearchResults(res.data.filterUser);
    },
    // eslint-disable-next-line
    [searchTerm]
  );

  const onClose = () => {
    prop.closeWindow();
  };
  const sendRequestHandler = async (id) => {
    const data = {
      method: "PUT",
      url: `api/v1/user/sendRequest`,
      payload: { userId: id },
      message: "Send Request Successfully",
    };
    await putPostMethod(data);
  };

  return (
    <Dialog open={open} onClose={onClose} sx={{ width: 500, margin: "0 auto" }}>
      <DialogTitle>Search User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Search"
          type="text"
          fullWidth
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(e.target.value);
          }}
        />

        <List
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "0vmax 3rem",
          }}
        >
          {searchResults &&
            searchResults.map((user) => {
              return (
                <ListItem
                  key={user._id}
                  sx={{
                    // width: "150%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.5rem 1.5rem",
                    boxShadow: "0px 3px 4px gray",
                    borderRadius: "5px",
                    marginTop: "1.5rem",
                    gap: "1rem",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={user?.avatar?.url}></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user?.name}
                    secondary={user?.name && user?.username}
                    sx={{
                      width: "5rem",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  />
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    sx={{
                      width: "2rem",
                      height: "2rem",
                      padding: "4px",
                      background: "#006A4E",
                      borderRadius: "50%",
                      color: "white",
                      cursor: "pointer",
                      ":hover": {
                        background: "#006A4E",
                        color: "white",
                      },
                    }}
                    onClick={() => {
                      sendRequestHandler(user._id);
                    }}
                  >
                    <Add />
                  </IconButton>
                </ListItem>
              );
            })}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default SearchToggle;
