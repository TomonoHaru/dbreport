import { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
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
  const [value, setValue] = useState(dayjs());
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
  console.log(productRegisterActive);

  return (
    <Box sx={{ minWidth: 240 }}>
      <Box>
        <FormControl fullWidth>
          <Field label="商品">
            <Select
              value={selectedMerchandise}
              onChange={(e) => {
                console.log(e);
                setSelectedMerchandise(e.target.value);
              }}
              sx={{ width: 200 }}
            >
              {merchandise.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item[0]}-￥{item[1]}
                </MenuItem>
              ))}
            </Select>
          </Field>
        </FormControl>

        <Button onClick={() => setProductRegisterActive(true)}>新規登録</Button>

        <Box>
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

      <Box>
        <Field label={"売上日"}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={value}
              onChange={(newValue) => setValue(dayjs(newValue))}
            />
          </LocalizationProvider>
        </Field>
      </Box>

      <Box>
        <Button
          onClick={async () => {
            const data = {
              name: selectedMerchandise[0],
              day: value,
              quantity: quantity,
            };

            await postSales(data);
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
