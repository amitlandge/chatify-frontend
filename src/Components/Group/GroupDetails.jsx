import {
  Add,
  Delete,
  Done,
  Edit,
  Remove,
  DeleteForever,
  Logout,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import DeleteToggle from "../Toggle/DeleteToggle";
import AddMemberOfGroup from "../Toggle/AddMemberOfGroup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import { useGetData } from "../../Hooks/useGetData";
import { useSelector } from "react-redux";

import { REFETCH_DATA } from "../../constants/eventConstant";
import { getSocket } from "../../context/getSocket";
import usePutPost from "../../Hooks/usePutPost";
import { animated, useSpring } from "@react-spring/web";
import { StyledButton } from "../../Style/GridStyle";
const GroupDetails = (prop) => {
  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);
  const [updatedValue, setUpdatedValue] = useState("");
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const param = useSearchParams()[0].get("group");
  const socket = getSocket();
  const { user } = useSelector((state) => state.auth);
  const [, data, getInitialData] = useGetData(
    `api/v1/chat/${param}/?populate=${true}`
  );
  const [, putPostMethod] = usePutPost();

  const addMemberOfGroup = () => {
    setAddMember(true);
  };
  const onCloseAddMember = () => {
    setAddMember(false);
    getInitialData();
  };
  const onConfirmLeaveHandler = () => {
    setDeleteDialog(true);
  };

  useEffect(() => {
    if (data?.chatDetails._id !== param) {
      getInitialData();
    }
    setUpdatedValue(data?.chatDetails.name);
  }, [param, data]);
  const filterMember = data?.chatDetails.members.filter((mem) => {
    return mem._id.toString() !== user._id.toString();
  });
  const onRemoveMember = async (id) => {
    const data = {
      method: "PUT",
      url: `api/v1/chat/removeMember`,
      payload: { chatId: param, userId: id },
      message: "Member Remove Successfully",
    };
    await putPostMethod(data);
  };
  const onUpdateGroupNameHandler = async () => {
    const data = {
      method: "PUT",
      url: `api/v1/chat/${param}`,
      payload: { name: updatedValue },
      message: "Update Name Successfully",
    };
    await putPostMethod(data);

    setIsEdit(false);
  };
  const onCloseDeleteHandler = () => {
    setDeleteDialog(false);
    prop.onClose();
  };

  const onConfirmDeleteHandler = async () => {
    const data = {
      method: "DELETE",
      url: `api/v1/chat/${param}`,
      message: "Delete Group Successfully",
    };
    await putPostMethod(data);
  };
  const refetchData = useCallback(
    (data) => {
      if (data.type === "GROUP") {
        getInitialData();
      } else if (data?.type === "DELETE") {
        navigate("/groups");
      }
      if (data.type === "RENAME") {
        navigate("/groups");
      }
    },
    [navigate, param]
  );
  useEffect(() => {
    socket.on(REFETCH_DATA, refetchData);
    return () => {
      socket.off(REFETCH_DATA, refetchData);
    };
  }, [refetchData, socket]);
  const spring = useSpring({
    from: {
      y: "-100%",
      opacity: "0",
    },
    to: {
      y: "0%",
      opacity: "1",
    },
  });
  return (
    <animated.div style={{ ...spring, width: "100%" }}>
      {data?.chatDetails?.creator === user._id ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            height: "100vh",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflowY: "hidden",
          }}
        >
          <>
            {isEdit ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <TextField
                    type="text"
                    value={updatedValue}
                    onChange={(e) => {
                      setUpdatedValue(e.target.value);
                    }}
                  />
                  <IconButton onClick={onUpdateGroupNameHandler}>
                    <Done />
                  </IconButton>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <Typography>{data?.chatDetails.name}</Typography>
                <IconButton
                  onClick={() => {
                    setIsEdit(true);
                  }}
                >
                  <Edit />
                </IconButton>
              </Box>
            )}
          </>
          <Box
            width={"100%"}
            height={"80vh"}
            mt={"2rem"}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>Members</Typography>
            <Box
              sx={{
                width: "70%",
                height: "100%",
                overflowY: "auto",
                background:
                  "linear-gradient(to top, rgb(182, 244, 146), rgb(51, 139, 147))",
                padding: "2rem",
                borderRadius: "5px",
                marginTop: "1rem",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {filterMember &&
                  filterMember.map((user) => {
                    return (
                      <Stack
                        key={user._id}
                        direction={"row"}
                        spacing={"1rem"}
                        padding={"1rem"}
                        alignItems={"center"}
                        bgcolor={"white"}
                        width={"70%"}
                        sx={{
                          display: "flex",
                          margin: "1rem",
                          justifyContent: "space-between",
                          borderRadius: "5px",
                        }}
                      >
                        <Avatar src={user?.avatar} />
                        <Typography
                          sx={{
                            width: "5rem",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                          }}
                        >
                          {user.name}
                        </Typography>
                        <IconButton
                          onClick={() => {
                            onRemoveMember(user._id);
                          }}
                        >
                          <Remove
                            sx={{
                              width: "1.5rem",
                              height: "1.5rem",
                              background: "red",
                              color: "white",
                              borderRadius: "50%",
                              cursor: "pointer",
                            }}
                          />
                        </IconButton>
                      </Stack>
                    );
                  })}
              </Stack>
            </Box>
            <Box
              sx={{
                margin: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                gap: "1rem",
              }}
            >
              <StyledButton
                variant="contained"
                startIcon={<Add />}
                onClick={() => {
                  addMemberOfGroup();
                }}
              >
                Add Member
              </StyledButton>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Logout />}
                onClick={() => {
                  onConfirmLeaveHandler();
                }}
              >
                Leave Group
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteForever />}
                onClick={() => {
                  onConfirmDeleteHandler();
                }}
              >
                Delete Group
              </Button>
            </Box>
          </Box>
        </div>
      ) : (
        <Box
          sx={{
            width: "70%",
            height: "100%",
            overflowY: "auto",
            background:
              "linear-gradient(to top, rgb(182, 244, 146), rgb(51, 139, 147))",
            padding: "2rem",
            borderRadius: "5px",
            marginTop: "1rem",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>Members</Typography>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "70%",
              gap: "1rem",
            }}
          >
            {filterMember &&
              filterMember.map((user) => {
                return (
                  <Stack
                    key={user._id}
                    direction={"row"}
                    spacing={"1rem"}
                    padding={"1rem"}
                    alignItems={"center"}
                    bgcolor={"white"}
                    width={"70%"}
                    sx={{
                      display: "flex",
                      margin: "1rem",
                      justifyContent: "space-around",
                      borderRadius: "5px",
                    }}
                  >
                    <Avatar src={user?.avatar} />
                    <Typography
                      sx={{
                        width: "5rem",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      {user.name}
                    </Typography>
                  </Stack>
                );
              })}
          </Stack>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={() => {
              onConfirmLeaveHandler();
            }}
            sx={{
              justifySelf: "center",
              alignSelf: "center",
              justifyContent: "center",
              margin: "1rem auto",
            }}
          >
            Leave Group
          </Button>
        </Box>
      )}
      {deleteDialog && (
        <DeleteToggle open={deleteDialog} onclose={onCloseDeleteHandler} />
      )}
      {addMember && (
        <AddMemberOfGroup open={addMember} onclose={onCloseAddMember} />
      )}
    </animated.div>
  );
};

export default GroupDetails;
