import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Dialog } from "@mui/material";

const EmojiPicker = (prop) => {
  return (
    <Dialog
      open={prop.emojiOpen}
      onClose={() => {
        prop.onClose();
      }}
    >
      <Picker
        data={data}
        onEmojiSelect={(emoji) => {
          prop.selectedEmoji(emoji);
        }}
      />
    </Dialog>
  );
};

export default EmojiPicker;
