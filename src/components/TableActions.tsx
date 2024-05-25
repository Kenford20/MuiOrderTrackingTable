import { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TableSearch from "./TableSearch";
import TableFilter from "./TableFilter";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { GlobalContext } from "../AppContext";

interface TableActionProps {
  selectedOrders: GridRowSelectionModel;
}

export default function TableActions({ selectedOrders }: TableActionProps) {
  const { dispatch } = useContext(GlobalContext);

  const deleteOrders = async () => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
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
      dispatch({
        type: "DELETE_ORDERS",
        payload: selectedOrders,
      });
    } else {
      console.log("handle error", response);
      window.alert("Failed to delete order.");
    }
    dispatch({ type: "SET_IS_LOADING", payload: false });
  };

  return (
    <div id="table-actions">
      <TableSearch />
      <button
        type="button"
        className="table-action-buttons"
        onClick={() => dispatch({ type: "OPEN_MODAL" })}
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
      <TableFilter />
    </div>
  );
}
