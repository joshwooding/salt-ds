import { GridApi, GridReadyEvent } from "ag-grid-community";
import React, { useEffect, useRef, useState } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "../../uitk-ag-theme-high.css";

/**
 * Example data can be found here
 * https://bitbucketdc.jpmchase.net/projects/JPMUITK/repos/jpm-ui-toolkit/browse/packages/data-grid/examples/dependencies
 */
import dataGridExampleData from "../dependencies/dataGridExampleData";
import dataGridExampleColumns from "../dependencies/dataGridExampleColumns";

// ideally these css files would be loaded from a link tag
// pointing to static asset directory for caching
// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { useAgGridRowHeight } from "../dependencies/useAgGridRowHeight";
import { useDensity } from "@jpmorganchase/uitk-core";

const Default = (props: AgGridReactProps) => {
  const apiRef = useRef<GridApi>();
  const [isGridReady, setGridReady] = useState(false);

  const onGridReady = ({ api }: GridReadyEvent) => {
    apiRef.current = api;
    api.sizeColumnsToFit();
    setGridReady(true);
  };

  const rowHeight = useAgGridRowHeight();
  const density = useDensity();
  const className = `ag-theme-uitk-${density}`;

  console.log(
    `Rendering with rowHeight=${rowHeight}; className: "${className}"`
  );
  useEffect(() => {
    if (isGridReady) {
      console.log(`Resetting row heights`);
      apiRef.current!.resetRowHeights();
    }
  }, [rowHeight, isGridReady]);

  return (
    <div style={{ height: 400, width: 600 }} className={className}>
      <AgGridReact
        columnDefs={dataGridExampleColumns}
        onGridReady={onGridReady}
        rowData={dataGridExampleData}
        rowHeight={rowHeight}
        headerHeight={rowHeight}
        rowSelection="single"
        {...props}
      />
    </div>
  );
};

export default Default;
