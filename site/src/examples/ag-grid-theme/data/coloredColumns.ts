import type { CellClassParams } from "ag-grid-community";

export const coloredColumns = [
  {
    headerName: "Name",
    field: "name",
    cellStyle: {
      color: "var(--salt-color-gray-900)",
      backgroundColor: "var(--salt-color-teal-20)",
    },
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
        return {
          color: "var(--salt-color-gray-900)",
          backgroundColor: "var(--salt-color-orange-20)",
        };
      }
      return null;
    },
  },
  {
    headerName: "Population",
    field: "population",
    filter: "agNumberColumnFilter",
    type: "numericColumn",
    editable: true,
    cellClass: ["editable-cell", "numeric-cell"],
  },
];
