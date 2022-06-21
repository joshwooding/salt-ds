import { GridReadyEvent, GridApi } from "ag-grid-community";
import React, { useState, useEffect, useRef } from "react";

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

const generateData = (states: typeof dataGridExampleData) =>
  states.reduce((result, row) => {
    const data = [];
    data.push(row);
    for (let i = 0; i < 20; i++) {
      data.push({ ...row, name: `${row.name} ${i}` });
    }
    return [...result, ...data];
  }, [] as typeof dataGridExampleData);

const PagedGrid = (props: AgGridReactProps) => {
  const [isGridReady, setIsGridReady] = useState(false);
  const gridApiRef = useRef<GridApi>();

  useEffect(() => {
    if (isGridReady && gridApiRef.current) {
      gridApiRef.current.sizeColumnsToFit();
    }
  }, [isGridReady]);

  const handleGridReady = ({ api }: GridReadyEvent) => {
    gridApiRef.current = api;
    setIsGridReady(true);
  };

  return (
    <AgGridReact
      columnDefs={dataGridExampleColumns}
      onGridReady={handleGridReady}
      pagination
      paginationPageSize={100}
      rowData={generateData(dataGridExampleData)}
      {...props}
    />
  );
};

const Pagination = () => (
  <div
    style={{
      marginTop: "-150px",
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <PagedGrid />
  </div>
);

export default Pagination;
