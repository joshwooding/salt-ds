import React, { Component, useEffect, useRef, useState } from "react";

/**
 * Example data can be found here
 * https://bitbucketdc.jpmchase.net/projects/JPMUITK/repos/jpm-ui-toolkit/browse/packages/data-grid/examples/dependencies
 */
import dataGridExampleData from "../dependencies/dataGridExampleData";
import dataGridExampleColumns from "../dependencies/dataGridExampleColumns";

// ideally these css files would be loaded from a link tag
// pointing to static asset directory for caching
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";

const headerOn = {
  headerName: "On",
  field: "on",
  checkboxSelection: true,
  headerCheckboxSelection: true,
};
const [headerName, , headerCapital] = dataGridExampleColumns;

const CheckboxSelectionExample = function CheckboxSelectionExample(
  props: AgGridReactProps
) {
  const [isGridReady, setGridReady] = useState(false);

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

  return (
    <div style={{ marginTop: 25 }}>
      <AgGridReact onGridReady={onGridReady} {...props} />
    </div>
  );
};

CheckboxSelectionExample.defaultProps = {
  columnDefs: [headerOn, headerName, headerCapital],
  rowData: dataGridExampleData,
};

export default function CheckboxSelection(props: AgGridReactProps) {
  return <CheckboxSelectionExample {...props} />;
}
