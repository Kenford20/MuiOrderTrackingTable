import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "./AppContext";
import { type GridRowSelectionModel, type GridColDef } from "@mui/x-data-grid";
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
  const { state, dispatch } = useContext(GlobalContext);
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
      .then((data) => dispatch({ type: "SET_ORDERS", payload: data }))
      .catch((error) => console.error(error));
  }, []);

  const getSelectedOrdersFromTable = (rows: GridRowSelectionModel) => {
    setSelectedOrders(rows);
  };

  return (
    <main>
      <Navbar />
      <ModalContainer />
      <Container>
        <TableActions selectedOrders={selectedOrders} />
        <Table
          rowData={state.filteredOrders}
          columnsConfig={orderTableConfig}
          getRowSelections={getSelectedOrdersFromTable}
        />
      </Container>
    </main>
  );
}

export default App;
