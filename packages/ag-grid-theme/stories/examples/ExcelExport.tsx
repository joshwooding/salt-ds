import { GridReadyEvent, GridApi } from "ag-grid-community";
import React, { useState, useEffect } from "react";
import { LicenseManager } from "ag-grid-enterprise";
import { Button } from "@jpmorganchase/uitk-core";

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

LicenseManager.setLicenseKey("your license key");

const ExcelExport = (props: AgGridReactProps) => {
  const [isGridReady, setIsGridReady] = useState(false);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  useEffect(() => {
    if (gridApi) {
      gridApi.sizeColumnsToFit();
    }
  }, [gridApi]);

  const onGridReady = ({ api }: GridReadyEvent) => {
    setGridApi(api);
    setIsGridReady(true);
  };

  const handleButtonClick = () => {
    if (gridApi) {
      gridApi.exportDataAsExcel();
    }
  };

  return (
    <div>
      <Button
        disabled={!isGridReady}
        onClick={handleButtonClick}
        style={{ marginBottom: "20px" }}
      >
        Export as Excel
      </Button>
      <AgGridReact
        columnDefs={dataGridExampleColumns}
        onGridReady={onGridReady}
        rowData={dataGridExampleData}
        {...props}
      />
    </div>
  );
};

export default ExcelExport;
