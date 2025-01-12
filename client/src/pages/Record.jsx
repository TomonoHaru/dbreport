import { useEffect, useState } from "react";
import { getMerchandise, postMerchandise, postSales } from "../../api";
import { Field } from "../components/Field";
import {
  Box,
  MenuItem,
  Select,
  FormControl,
  Button,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { ProductRegister } from "../components/ProductRegister";

export const Record = () => {
  const [merchandise, setMerchandise] = useState([]);
  const [day, setDay] = useState(dayjs());
  const [selectedMerchandise, setSelectedMerchandise] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [productRegisterActive, setProductRegisterActive] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getMerchandise();
      setMerchandise(data);
    })();
  }, []);

  const handleProductRegisterClose = () => {
    setProductRegisterActive(false);
  };

  const handleProductRegistered = async () => {
    const updatedMerchandise = await getMerchandise();
    setMerchandise(updatedMerchandise);
    setProductRegisterActive(false);
  };

  return (
    <Box sx={{ minWidth: 240 }}>
      <Box>
        <FormControl fullWidth>
          <Field label="商品">
            <Select
              value={selectedMerchandise}
              onChange={(e) => setSelectedMerchandise(e.target.value)}
              sx={{ width: 200 }}
            >
              {merchandise.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item[0]} - ￥{item[1]}
                </MenuItem>
              ))}
            </Select>
          </Field>
        </FormControl>

        <Box sx={{ marginTop: 2 }}>
          <Button onClick={() => setProductRegisterActive(true)}>
            新規登録
          </Button>
        </Box>

        <Box sx={{ marginTop: 4 }}>
          <Field label={"売上個数"}>
            <TextField
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              sx={{ width: 200 }}
            />
          </Field>
        </Box>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Field label={"売上日"}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={day} onChange={(newDay) => setDay(newDay)} />
          </LocalizationProvider>
        </Field>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Button
          onClick={async () => {
            const data = {
              name: selectedMerchandise[0],
              day: day,
              quantity: quantity,
            };

            await postSales(data);
          }}
          variant="contained"
          color="primary"
          sx={{
            padding: "10px 20px",
            fontSize: "16px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor: "#3f51b5",
              boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          登録
        </Button>
      </Box>

      {productRegisterActive && (
        <ProductRegister
          onRegister={handleProductRegistered}
          onClose={handleProductRegisterClose}
        />
      )}
    </Box>
  );
};
