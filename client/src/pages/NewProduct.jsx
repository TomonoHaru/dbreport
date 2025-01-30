import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { postProduct } from "../../api";

export const NewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  return (
    <Box>
      <Box>
        <TextField
          label="商品名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="価格"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          margin="normal"
        />
      </Box>
      <Button
        onClick={async () => {
          if (!name || !price) {
            alert("商品名と価格を入力してください");
            return;
          }
          const data = {
            name: name,
            price: price,
          };
          await postProduct(data);
          setName("");
          setPrice("");
        }}
        variant="contained"
        color="primary"
      >
        登録
      </Button>
    </Box>
  );
};
