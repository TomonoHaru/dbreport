import { useEffect, useState } from "react";
import { getSales } from "../../api";
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
} from "@mui/material";

export const SalesList = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getSales();
      setSales(data);
    })();
  }, []);

  console.log(sales);

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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
