import { GridReadyEvent } from "ag-grid-community";
import React from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "../../index.css";

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

const Default = (props: AgGridReactProps) => {
  const onGridReady = ({ api }: GridReadyEvent) => {
    api.sizeColumnsToFit();
  };

  return (
    <div style={{ height: 400, width: 600 }} className={"ag-theme-uitk"}>
      <AgGridReact
        columnDefs={dataGridExampleColumns}
        onGridReady={onGridReady}
        rowData={dataGridExampleData}
        rowHeight={24}
        headerHeight={24}
        rowSelection="single"
        {...props}
      />
    </div>
  );
};

export default Default;
