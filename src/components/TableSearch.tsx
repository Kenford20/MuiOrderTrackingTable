import { useContext } from "react";
import { GlobalContext } from "../AppContext";
import { debounce } from "../utils";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./TableSearch.css";

export default function TableSearch() {
  const { state, dispatch } = useContext(GlobalContext);
  const handleOnChange = debounce((searchText: string) => {
    dispatch({
      type: "SET_FILTERED_ORDERS",
      payload: state.orders.filter(
        (order) =>
          order.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchText.toLowerCase())
      ),
    });
  }, 250);

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
