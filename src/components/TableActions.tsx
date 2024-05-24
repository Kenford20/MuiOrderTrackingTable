import { Dispatch, SetStateAction } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TableSearch from "./TableSearch";
import TableFilter from "./TableFilter";
import { Order } from "../types/Order.types";
import { GridRowSelectionModel } from "@mui/x-data-grid";

interface TableActionProps {
  orders: Order[];
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setOrders: Dispatch<SetStateAction<Order[]>>;
  setFilteredOrders: Dispatch<SetStateAction<Order[]>>;
  selectedOrders: GridRowSelectionModel;
}

export default function TableActions({
  orders,
  setOrders,
  setFilteredOrders,
  setOpenModal,
  selectedOrders,
}: TableActionProps) {
  const deleteOrders = async () => {
    const response = await fetch(
      "https://red-candidate-web.azurewebsites.net/api/Orders/Delete",
      {
        method: "post",
        body: JSON.stringify(selectedOrders),
        headers: {
          "Content-Type": "application/json",
          ApiKey: import.meta.env.VITE_API_KEY,
        },
      }
    );
    if (response.ok) {
      setOrders((prevOrders) =>
        prevOrders.filter((order) => !selectedOrders.includes(order.orderId))
      );
      setFilteredOrders((prevOrders) =>
        prevOrders.filter((order) => !selectedOrders.includes(order.orderId))
      );
    } else {
      console.log("handle error", response);
      window.alert("Failed to delete order.");
    }
  };

  return (
    <div id="table-actions">
      <TableSearch orders={orders} setFilteredOrders={setFilteredOrders} />
      <button
        type="button"
        className="table-action-buttons"
        onClick={() => setOpenModal(true)}
      >
        <AddIcon fontSize="small" />
        CREATE ORDER
      </button>
      <button
        type="button"
        className={`table-action-buttons ${
          selectedOrders.length === 0 && "disabled-button"
        }`}
        disabled={selectedOrders.length === 0}
        onClick={deleteOrders}
      >
        <DeleteForeverIcon fontSize="small" />
        DELETE SELECTED
      </button>
      <TableFilter orders={orders} setFilteredOrders={setFilteredOrders} />
    </div>
  );
}
