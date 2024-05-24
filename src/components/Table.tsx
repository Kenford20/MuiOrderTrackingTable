import { Container } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Order } from "../types/Order.types";
import "./Table.css";

interface TableProps {
  rowData: Order[];
  columnsConfig: GridColDef[];
}

export default function Table({ rowData, columnsConfig }: TableProps) {
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
      />
    </Container>
  );
}
