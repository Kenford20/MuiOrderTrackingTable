import { Container } from "@mui/material";
import { Order } from "../types/Order.types";
import {
  DataGrid,
  type GridRowSelectionModel,
  type GridColDef,
} from "@mui/x-data-grid";
import "./Table.css";

interface TableProps {
  rowData: Order[];
  columnsConfig: GridColDef[];
  getRowSelections: (rows: GridRowSelectionModel) => void;
}

export default function Table({
  rowData,
  columnsConfig,
  getRowSelections,
}: TableProps) {
  return (
    <Container>
      <DataGrid
        rows={rowData}
        columns={columnsConfig}
        getRowId={(row) => row.orderId}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={(rowSelectionModel, details) => {
          console.log("rowSelectionModel", rowSelectionModel);
          console.log("details", details);
          getRowSelections(rowSelectionModel);
        }}
      />
    </Container>
  );
}
