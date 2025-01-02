import { useEffect, useState } from "react";
import { getMonthlySales } from "../../api";
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

export const MounthlyTotal = () => {
  const [monthlySales, setMonthlySales] = useState([]);

  useEffect(() => {
    const fetchMonthlySales = async () => {
      const data = await getMonthlySales();
      setMonthlySales(data);
    };
    fetchMonthlySales();
  }, []);

  return (
    <Box>
      <Button onClick={() => (window.location.href = "/sales/list")}>
        売上リストに戻る
      </Button>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>月</TableCell>
              <TableCell>売上合計 (円)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {monthlySales.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  {new Date(item.month).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "long",
                  })}
                </TableCell>
                <TableCell>￥{item.total.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
