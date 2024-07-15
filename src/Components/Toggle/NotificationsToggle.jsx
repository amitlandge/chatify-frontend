import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../redux/reducers/notifications";

import { clearNotificationCount } from "../../redux/reducers/chat";
import { setIsNotification } from "../../redux/reducers/misc";
import usePutPost from "../../Hooks/usePutPost";
import { useGetData } from "../../Hooks/useGetData";
import { StyledButton } from "../../Style/GridStyle";

const NotificationsToggle = (prop) => {
  const dispatch = useDispatch();
  const [, putPostMethod] = usePutPost();
  const { notifications } = useSelector((state) => state.notifications);
  const [, data] = useGetData(`api/v1/user/getAllNotifications`);

  dispatch(getNotifications(data?.getNotifications));

  dispatch(clearNotificationCount());
  const handleAccept = async (id) => {
    const data = {
      method: "PUT",
      url: `api/v1/user/acceptRequest`,
      payload: { requestId: id, accept: true },
      message: "Request Accept Successfully",
    };
    const res = await putPostMethod(data);
    if (res.status === 200) {
      dispatch(setIsNotification(false));
    }
  };
  const onClose = () => {
    prop.closeWindow();
  };
  const handleDelete = async (id) => {
    const data = {
      method: "PUT",
      url: `api/v1/user/acceptRequest`,
      payload: { requestId: id, accept: false },
      message: "Request Reject Successfully",
    };
    const res = await putPostMethod(data);
    if (res.status === 200) {
      dispatch(setIsNotification(false));
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Notifications</DialogTitle>
        <DialogContent>
          {notifications?.length === 0 ? (
            <Typography>No Notification found</Typography>
          ) : (
            <List>
              {notifications?.map((notification) => (
                <ListItem key={notification._id}>
                  <ListItemText
                    primary={notification?.sender.name}
                    sx={{
                      width: "5rem",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  />
                  <DialogActions>
                    <StyledButton
                      variant="contained"
                      onClick={() => handleAccept(notification._id)}
                      color="primary"
                    >
                      Accept
                    </StyledButton>
                    <Button
                      onClick={() => handleDelete(notification._id)}
                      color="error"
                    >
                      Reject
                    </Button>
                  </DialogActions>
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationsToggle;
