import { Dispatch, SetStateAction, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Order } from "../types/Order.types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const orderTypes = [
  "Standard",
  "SaleOrder",
  "TransferOrder",
  "PurchaseOrder",
  "ReturnOrder",
];

interface ModalContainerProps {
  open: boolean;
  handleClose: () => void;
  setOrders: Dispatch<SetStateAction<Order[]>>;
  setFilteredOrders: Dispatch<SetStateAction<Order[]>>;
}

export default function ModalContainer({
  open,
  handleClose,
  setOrders,
  setFilteredOrders,
}: ModalContainerProps) {
  const [orderType, setOrderType] = useState<string>("");
  const handleChange = (event: SelectChangeEvent<typeof orderType>) => {
    setOrderType(event.target.value);
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    const response = await fetch(
      "https://red-candidate-web.azurewebsites.net/api/Orders",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          ApiKey: import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify(formJson),
      }
    );

    if (response.ok) {
      const newOrder = await response.json();
      setOrders((prevOrders) => [...prevOrders, newOrder]);
      setFilteredOrders((prevOrders) => [...prevOrders, newOrder]);
      handleClose();
    } else {
      console.log("trigger error state", response);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleOnSubmit(event);
        },
      }}
    >
      <DialogTitle>Create Order</DialogTitle>
      <DialogContent>
        <DialogContentText>Pls fill out the form.</DialogContentText>
        <TextField
          required
          size="small"
          margin="normal"
          id="order-creator"
          name="createdByUsername"
          label="Full Name"
          type="text"
          fullWidth
        />
        <TextField
          required
          size="small"
          margin="normal"
          id="company"
          name="customerName"
          label="Company"
          type="text"
          fullWidth
        />
        <FormControl sx={{ width: 250, mt: "15px" }} size="small">
          <InputLabel id="create-order-type-label">Order Type</InputLabel>
          <Select
            required
            labelId="create-order-type-label"
            name="orderType"
            id="create-order-type"
            value={orderType}
            onChange={handleChange}
            input={<OutlinedInput label="Order Type" />}
            MenuProps={MenuProps}
          >
            {orderTypes.map((orderType) => (
              <MenuItem key={orderType} value={orderType}>
                {orderType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Create</Button>
        <Button type="submit">Save As Draft</Button>
      </DialogActions>
    </Dialog>
  );
}
