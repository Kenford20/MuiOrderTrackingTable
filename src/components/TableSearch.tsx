import { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { GlobalContext } from "../AppContext";
import "./TableSearch.css";

export default function TableSearch() {
  const { state, dispatch } = useContext(GlobalContext);
  // TODO: debounce
  const handleOnChange = (searchText: string) => {
    dispatch({
      type: "SET_FILTERED_ORDERS",
      payload: state.orders.filter(
        (order) =>
          order.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchText.toLowerCase())
      ),
    });
  };

  return (
    <div id="table-search">
      <TextField
        required
        size="small"
        id="customer-search"
        name="customerSearch"
        label="Customer Search"
        type="text"
        fullWidth
        onChange={(e) => handleOnChange(e.target.value)}
      />
      <div className="search-button">
        <SearchIcon />
      </div>
    </div>
  );
}
