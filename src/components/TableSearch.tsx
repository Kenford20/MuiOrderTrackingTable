import { type Dispatch, type SetStateAction } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Order } from "../types/Order.types";
import "./TableSearch.css";

interface TableSearchProps {
  orders: Order[];
  setFilteredOrders: Dispatch<SetStateAction<Order[]>>;
}

export default function TableSearch({
  orders,
  setFilteredOrders,
}: TableSearchProps) {
  // TODO: debounce
  const handleOnChange = (searchText: string) => {
    setFilteredOrders(
      orders.filter(
        (order) =>
          order.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  return (
    <div id="table-search">
      <input
        id="table-search-input"
        placeholder="Customer Search"
        onChange={(e) => handleOnChange(e.target.value)}
      />
      <div className="search-button">
        <SearchIcon />
      </div>
    </div>
  );
}
