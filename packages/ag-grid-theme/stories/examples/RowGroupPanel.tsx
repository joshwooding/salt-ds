import React, { useEffect, useRef, useState } from "react";
import { LicenseManager } from "ag-grid-enterprise";

/**
 * Example data can be found here
 * https://bitbucketdc.jpmchase.net/projects/JPMUITK/repos/jpm-ui-toolkit/browse/packages/data-grid/examples/dependencies
 */
import dataGridExampleData from "../dependencies/dataGridExampleData";
import dataGridExampleRowGroupPanel from "../dependencies/dataGridExampleRowGroupPanel";

// ideally these css files would be loaded from a link tag
// pointing to static asset directory for caching
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { GridApi, GridReadyEvent } from "ag-grid-community";

LicenseManager.setLicenseKey("your license key");

const RowGroupPanelExample = function RowGroupPanelExample(
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
    <AgGridReact
      columnDefs={dataGridExampleRowGroupPanel}
      defaultColDef={{
        enableRowGroup: true,
      }}
      onGridReady={onGridReady}
      rowData={dataGridExampleData}
      rowGroupPanelShow="always"
      {...props}
    />
  );
};

export default function RowGroupPanel(props: AgGridReactProps) {
  return <RowGroupPanelExample {...props} />;
}
