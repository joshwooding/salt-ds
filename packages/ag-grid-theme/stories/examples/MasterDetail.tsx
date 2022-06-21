import React, { useEffect, useRef, useState } from "react";
import { LicenseManager } from "ag-grid-enterprise";

/**
 * Example data can be found here
 * https://bitbucketdc.jpmchase.net/projects/JPMUITK/repos/jpm-ui-toolkit/browse/packages/data-grid/examples/dependencies
 */
import columnDefs from "../dependencies/masterDetailExampleData";
import rowData from "../dependencies/dataGridExampleData";

// ideally these css files would be loaded from a link tag
// pointing to static asset directory for caching
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { GridApi, GridReadyEvent } from "ag-grid-community";

LicenseManager.setLicenseKey("your license key");

const MasterDetailExample = function MasterDetailExample(
  props: AgGridReactProps
) {
  // state = { isGridReady: false };
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
      columnDefs={columnDefs}
      detailCellRendererParams={{
        detailGridOptions: { columnDefs },
        getDetailRowData: (params: any) => params.successCallback(rowData),
      }}
      masterDetail
      onGridReady={onGridReady}
      rowData={rowData}
      {...props}
    />
  );
};

export default function MasterDetail(props: AgGridReactProps) {
  return <MasterDetailExample {...props} />;
}
