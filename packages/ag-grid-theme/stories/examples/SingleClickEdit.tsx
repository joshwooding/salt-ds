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
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { GridApi, GridReadyEvent } from "ag-grid-community";

const SingleClickEditExample = function SingleClickEditExample(
  props: AgGridReactProps
) {
  const [isGridReady, setGridReady] = useState(false);
  const gridApiRef = useRef<GridApi>();

  useEffect(() => {
    if (isGridReady) {
      gridApiRef.current!.sizeColumnsToFit();
    }
  }, [isGridReady]);

  const onGridReady = ({ api }: GridReadyEvent) => {
    gridApiRef.current = api;
    setGridReady(true);
  };

  return (
    <div style={{ marginTop: 25 }}>
      <AgGridReact onGridReady={onGridReady} {...props} singleClickEdit />
    </div>
  );
};

SingleClickEditExample.defaultProps = {
  columnDefs: dataGridExampleColumns,
  rowData: dataGridExampleData,
};

export default function SingleClickEdit(props: AgGridReactProps) {
  return <SingleClickEditExample {...props} />;
}
