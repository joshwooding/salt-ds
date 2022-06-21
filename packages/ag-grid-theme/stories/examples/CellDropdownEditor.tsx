import React, { Component, useEffect, useRef, useState } from "react";

import RatingDropdown from "./RatingDropdown";
/**
 * Example data can be found here
 * https://bitbucketdc.jpmchase.net/projects/JPMUITK/repos/jpm-ui-toolkit/browse/packages/data-grid/examples/dependencies
 */
import dataGridExampleData from "../dependencies/dataGridExampleData";

// ideally these css files would be loaded from a link tag
// pointing to static asset directory for caching
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";

/**
 * Based on the examples provided by
 * https://www.ag-grid.com/javascript-grid-cell-editor/
 * This examples uses a JPM UI Toolkit Dropdown as a cell editor
 * complete with focus and keyboard navigation support
 */
const CellDropdownEditorExample = function CellDropdownEditorExample(
  props: AgGridReactProps
) {
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { headerName: "Name", field: "name" },
    { headerName: "Code", field: "code", minWidth: 120 },
    { headerName: "Capital", field: "capital" },
    { headerName: "Population", field: "population" },
    {
      headerName: "Rating",
      field: "rating",
      editable: true,
      cellEditorFramework: RatingDropdown,
      suppressKeyboardEvent: (params) => params.editing,
      width: 100,
    },
  ]);
  const [isGridReady, setGridReady] = useState<boolean>(false);
  const [rowData, setRowData] = useState(dataGridExampleData);

  const gridApiRef = useRef<GridApi>();

  useEffect(() => {
    if (isGridReady) {
      gridApiRef.current?.sizeColumnsToFit();
    }
  }, [isGridReady]);

  const onGridReady = (event: GridReadyEvent) => {
    gridApiRef.current = event.api;
    setGridReady(true);
  };

  const onBodyScroll = () => {
    gridApiRef.current?.stopEditing();
  };

  return (
    <AgGridReact
      columnDefs={columnDefs}
      onBodyScroll={onBodyScroll}
      onGridReady={onGridReady}
      {...props}
      rowData={rowData}
    />
  );
};

export default function CellDropdownEditor(props: AgGridReactProps) {
  return <CellDropdownEditorExample {...props} />;
}
