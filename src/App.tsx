import { useState, useEffect } from "react";
import { type GridRowSelectionModel, type GridColDef } from "@mui/x-data-grid";
import { Order } from "./types/Order.types";
import { Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import TableSearch from "./components/TableSearch";
import TableFilter from "./components/TableFilter";
import ModalContainer from "./components/Modal";
import "./App.css";

const orderTableConfig: GridColDef[] = [
  { field: "orderId", headerName: "Order ID", width: 300 },
  { field: "createdDate", headerName: "Creation Date", width: 200 },
  { field: "createdByUserName", headerName: "Created By", width: 200 },
  {
    field: "orderType",
    headerName: "Order Type",
    width: 150,
  },
  {
    field: "customerName",
    headerName: "Customer",
    width: 200,
  },
];

function App() {
  // TODO: useReducer to manage orders/filteredOrders state so dont gotta pass the setters everywhere
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedOrders, setSelectedOrders] = useState<GridRowSelectionModel>(
    []
  );

  useEffect(() => {
    fetch("https://red-candidate-web.azurewebsites.net/api/Orders", {
      method: "get",
      headers: {
        "content-type": "application/json",
        ApiKey: import.meta.env.VITE_API_KEY, // vite way of accessing environment vars
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error(error))
      .then((data) => {
        setOrders(data);
        setFilteredOrders(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const getSelectedOrdersFromTable = (rows: GridRowSelectionModel) => {
    setSelectedOrders(rows);
  };

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

  console.log(orders);

  return (
    <main>
      <Navbar />
      <ModalContainer
        open={openModal}
        handleClose={() => setOpenModal(false)}
        setOrders={setOrders}
        setFilteredOrders={setFilteredOrders}
      />
      <Container>
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
      </Container>
      <Table
        rowData={filteredOrders}
        columnsConfig={orderTableConfig}
        getRowSelections={getSelectedOrdersFromTable}
      />
    </main>
  );
}

export default App;
