import { CellClassParams } from "ag-grid-community";

const dataGridExampleColumnsColoration = [
  {
    headerName: "Name",
    field: "name",
    // TODO
    // cellStyle: { color: color.grey900, backgroundColor: color.teal50 }
  },
  {
    headerName: "Code",
    field: "code",
    filter: "agTextColumnFilter",
    minWidth: 120,
  },
  {
    headerName: "Capital",
    field: "capital",
    cellStyle: (params: CellClassParams) => {
      if (params.value === "Atlanta") {
        return {};
        // TODO
        // return { color: color.grey900, backgroundColor: color.orange100 };
      } else {
        return null;
      }
    },
  },
  {
    headerName: "Population",
    field: "population",
    filter: "agNumberColumnFilter",
    editable: true,
    cellClass: ["editable-cell"],
  },
];

export default dataGridExampleColumnsColoration;
