import { GlobalContext } from "../AppContext";
import { useContext, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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

export default function TableFilter() {
  const [orderType, setOrderType] = useState<string>("");
  const { state, dispatch } = useContext(GlobalContext);
  const handleChange = (event: SelectChangeEvent<typeof orderType>) => {
    setOrderType(event.target.value);
    dispatch({
      type: "SET_FILTERED_ORDERS",
      payload: state.orders.filter(
        (order) =>
          event.target.value === "" || order.orderType === event.target.value
      ),
    });
  };

  return (
    <FormControl sx={{ width: 250 }} size="small">
      <InputLabel id="table-filter-label">Order Type</InputLabel>
      <Select
        labelId="table-filter-label"
        id="table-filter"
        value={orderType}
        onChange={handleChange}
        input={<OutlinedInput label="Order Type" />}
        MenuProps={MenuProps}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {orderTypes.map((orderType) => (
          <MenuItem key={orderType} value={orderType}>
            {orderType}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
