import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useNavigate, useSearchParams } from "react-router-dom";

import usePutPost from "../../Hooks/usePutPost";
import { StyledButton } from "../../Style/GridStyle";

const DeleteToggle = (prop) => {
  const param = useSearchParams()[0].get("group");
  const [, putPostMethod] = usePutPost();
  const navigate = useNavigate();
  const { open, onclose } = prop;
  const onConfirmLeaveGroup = async () => {
    const data = {
      method: "DELETE",
      url: `api/v1/chat/leave/${param}`,

      message: "Leave Group Successfully",
    };
    const res = await putPostMethod(data);
    if (res.status === 200) {
      navigate("/groups");
      prop.onclose();
    }
  };
  return (
    <Dialog open={open} onClose={onclose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are You Sure You Want To Leave this Group !
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            onclose();
          }}
        >
          No
        </Button>
        <StyledButton variant="contained" onClick={onConfirmLeaveGroup}>
          Yes
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteToggle;
