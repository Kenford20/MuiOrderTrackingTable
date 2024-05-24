import { useState, useEffect } from "react";
import { type GridRowSelectionModel, type GridColDef } from "@mui/x-data-grid";
import { Order } from "./types/Order.types";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import ModalContainer from "./components/Modal";
import TableActions from "./components/TableActions";
import Table from "./components/Table";
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
        <TableActions
          orders={orders}
          setOrders={setOrders}
          setFilteredOrders={setFilteredOrders}
          setOpenModal={setOpenModal}
          selectedOrders={selectedOrders}
        />
        <Table
          rowData={filteredOrders}
          columnsConfig={orderTableConfig}
          getRowSelections={getSelectedOrdersFromTable}
        />
      </Container>
    </main>
  );
}

export default App;
