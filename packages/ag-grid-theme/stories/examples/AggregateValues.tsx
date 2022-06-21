import React, { Component, useEffect, useRef, useState } from "react";

/**
 * Example data can be found here
 * https://bitbucketdc.jpmchase.net/projects/JPMUITK/repos/jpm-ui-toolkit/browse/packages/data-grid/examples/dependencies
 */
import dataGridExampleData from "../dependencies/dataGridExampleData";
// import dataGridExampleColumns from './dependencies/dataGridExampleColumns';

// ideally these css files would be loaded from a link tag
// pointing to static asset directory for caching
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";

export default {
  title: "Ag Grid Theme",
  component: AgGridReact,
};

const AggregateValuesExample = function AggregateValuesExample(
  props: AgGridReactProps
) {
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: "Name",
      field: "name",
      width: 100,
      sortable: true,
      filter: true,
      resizable: true,
      aggFunc: "sum",
      enableValue: true,
      allowedAggFuncs: ["sum", "min", "max"],
      rowGroup: true,
    },
    {
      headerName: "Code",
      field: "code",
      width: 100,
      sortable: true,
      filter: true,
      resizable: true,
      aggFunc: "min",
      enableValue: true,
    },
    {
      headerName: "Country",
      field: "country",
      width: 100,
      sortable: true,
      filter: true,
      resizable: true,
      aggFunc: "max",
      enableValue: true,
    },
    {
      headerName: "Capital",
      field: "capital",
      width: 100,
      sortable: true,
      filter: true,
      resizable: true,
      aggFunc: "avg",
      enableValue: true,
    },
    {
      headerName: "Population",
      field: "population",
      width: 90,
    },
  ]);
  const [defaultColDef, setDefaultColDef] = useState({
    enableValue: true,
    enableRowGroup: true,
    enablePivot: true,
    sortable: true,
    filter: true,
  });
  const [rowData, setRowData] = useState([]);

  const [isGridReady, setIsGridReady] = useState(false);

  const gridApiRef = useRef<GridApi>();

  useEffect(() => {
    if (isGridReady) {
      gridApiRef.current?.sizeColumnsToFit();
    }
  }, [isGridReady]);

  const onGridReady = (event: GridReadyEvent) => {
    gridApiRef.current = event.api;
    setIsGridReady(true);
  };

  return (
    <div style={{ marginTop: 25 }}>
      <AgGridReact
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        rowData={dataGridExampleData}
        sideBar
        {...props}
      />
    </div>
  );
};

AggregateValuesExample.defaultProps = {
  rowData: dataGridExampleData,
};

export function AggregateValues(props: AgGridReactProps) {
  return <AggregateValuesExample {...props} />;
}
