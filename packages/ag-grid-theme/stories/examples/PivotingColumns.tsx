import React, { useEffect, useRef, useState } from "react";

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
import { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";

const PivotingColumnsExample = function PivotingColumnsExample(
  props: AgGridReactProps
) {
  const columnDefs: ColDef[] = [
    {
      headerName: "Name",
      field: "name",
      width: 120,
      rowGroup: true,
      enableRowGroup: true,
    },
    {
      headerName: "Code",
      field: "code",
      width: 90,
      pivot: true,
      enablePivot: true,
    },
    {
      headerName: "Capital",
      field: "capital",
      width: 110,
      enablePivot: true,
      enableRowGroup: true,
    },
    {
      headerName: "Population",
      field: "population",
      width: 110,
      enablePivot: true,
      enableRowGroup: true,
    },
  ];
  const defaultColDef: ColDef = {
    resizable: true,
    filter: true,
    enableValue: true,
    enableRowGroup: true,
    enablePivot: true,
    sortable: true,
  };
  const rowData = [];

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
      <AgGridReact
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        // enablePivot
        onGridReady={onGridReady}
        rowData={dataGridExampleData}
        sideBar
        {...props}
      />
    </div>
  );
};

PivotingColumnsExample.defaultProps = {
  columnDefs: dataGridExampleColumns,
  rowData: dataGridExampleData,
};

export default function PivotingColumns(props: AgGridReactProps) {
  return <PivotingColumnsExample {...props} />;
}
