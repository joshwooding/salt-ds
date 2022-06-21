import React, { useEffect, useRef, useState } from "react";

/**
 * Example data can be found here
 * https://bitbucketdc.jpmchase.net/projects/JPMUITK/repos/jpm-ui-toolkit/browse/packages/data-grid/examples/dependencies
 */
import dataGridExampleData from "../dependencies/dataGridExampleData";
import dataGridExampleColumnsColoration from "../dependencies/dataGridExampleColumnsColoration";

// ideally these css files would be loaded from a link tag
// pointing to static asset directory for caching
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { GridApi, GridReadyEvent } from "ag-grid-community";

const ColorationExample = function ColorationExample(props: AgGridReactProps) {
  const [isGridReady, setGridReady] = useState<boolean>(false);

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

ColorationExample.defaultProps = {
  columnDefs: dataGridExampleColumnsColoration,
  rowData: dataGridExampleData,
};

export default function Coloration(props: AgGridReactProps) {
  return <ColorationExample {...props} />;
}
