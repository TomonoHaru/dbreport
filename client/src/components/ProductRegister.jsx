import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

export const ProductRegister = ({ open, onClose, onRegister }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleRegister = () => {
    if (!name || !price) {
      alert("商品名と価格を入力してください");
      return;
    }
    onRegister({ name, price: parseInt(price, 10) });
    setName("");
    setPrice("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>新規商品登録</DialogTitle>
      <DialogContent>
        <TextField
          label="商品名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="価格"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button onClick={handleRegister} variant="contained" color="primary">
          登録
        </Button>
      </DialogActions>
    </Dialog>
  );
};
