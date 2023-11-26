import React from "react";
import { Dialog, DialogTitle } from "@mui/material";

function ChangeAvatar({ onClose, open }) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Елемент у розробці</DialogTitle>
    </Dialog>
  );
}

export default ChangeAvatar;
