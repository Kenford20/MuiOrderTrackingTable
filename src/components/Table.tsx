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
    <DataGrid
      rows={rowData}
      columns={columnsConfig}
      getRowId={(row) => row.orderId}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[10, 20]}
      checkboxSelection
      onRowSelectionModelChange={(rowSelectionModel) =>
        getRowSelections(rowSelectionModel)
      }
    />
  );
}
