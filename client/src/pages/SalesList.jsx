import { useEffect, useState } from "react";
import { deleteSale, getSales } from "../../api";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

export const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getSales();
      setSales(data);
    })();
  }, []);

  return (
    <Box>
      <Button onClick={() => (window.location.href = "/sales/record")}>
        売上記録に戻る
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>商品名</TableCell>
              <TableCell>売上日</TableCell>
              <TableCell>個数</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale, index) => (
              <TableRow key={index}>
                <TableCell>{sale[0]}</TableCell>
                <TableCell>{sale[1]}</TableCell>
                <TableCell>{sale[2]}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => {
                      setSelectedSale(sale[3]);
                      setOpen(true);
                    }}
                  >
                    消去
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClick={() => {
          setOpen(false);
          setSelectedSale(null);
        }}
      >
        <DialogTitle>削除の確認</DialogTitle>
        <DialogContent>
          <DialogContentText>本当に削除しますか？</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              setSelectedSale(null);
            }}
            color="primary"
          >
            キャンセル
          </Button>
          <Button
            onClick={async () => {
              await deleteSale(selectedSale);
              const data = await getSales();
              setSales(data);
            }}
            color="error"
          >
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
