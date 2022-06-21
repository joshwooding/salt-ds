import React, { useEffect, useRef, useState } from "react";
import { Button } from "@jpmorganchase/uitk-core";

/**
 * Example data can be found here
 * https://bitbucketdc.jpmchase.net/projects/JPMUITK/repos/jpm-ui-toolkit/browse/packages/data-grid/examples/dependencies
 */
import dataGridExampleData from "../dependencies/dataGridExampleData";
import customFilterExampleColumns from "../dependencies/customFilterExampleColumns";

// ideally these css files would be loaded from a link tag
// pointing to static asset directory for caching
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { GridApi, GridReadyEvent } from "ag-grid-community";

const CustomFilterExample = function CustomFilterExample(
  props: AgGridReactProps
) {
  const [hasSavedState, setHasSavedState] = useState(true);
  const [isGridReady, setGridReady] = useState(false);

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

  const handlePopMt100kClick = () => {
    const popMt100kComponent =
      gridApiRef.current!.getFilterInstance("population")!;
    gridApiRef.current!.setFilterModel(null);

    popMt100kComponent.setModel({
      type: "greaterThan",
      filter: 100000,
      filterTo: null,
    });

    gridApiRef.current!.onFilterChanged();
    setHasSavedState(false);
  };

  const handlePopLt100kClick = () => {
    const popLt100kComponent =
      gridApiRef.current!.getFilterInstance("population")!;
    gridApiRef.current!.setFilterModel(null);

    popLt100kComponent.setModel({
      type: "lessThan",
      filter: 100000,
      filterTo: null,
    });

    gridApiRef.current!.onFilterChanged();
    setHasSavedState(false);
  };

  const filterNewYork = () => {
    const filterNewYork = gridApiRef.current!.getFilterInstance("name")!;
    gridApiRef.current!.setFilterModel(null);
    filterNewYork.setModel({
      type: "equals",
      filter: "New York",
      filterTo: null,
    });
    gridApiRef.current!.onFilterChanged();
    setHasSavedState(false);
  };

  const saveState = () => {
    (window as any).filterState = gridApiRef.current!.getFilterModel();
    setHasSavedState(false);
  };

  const restoreState = () => {
    gridApiRef.current!.setFilterModel((window as any).filterState);
    setHasSavedState(true);
  };

  const clearState = () => {
    gridApiRef.current!.setFilterModel(null);
    setHasSavedState(true);
  };

  return (
    <div style={{ marginTop: 25 }}>
      <div style={{ display: "flex" }}>
        <Button onClick={handlePopLt100kClick}>Pop &gt; 100k</Button>
        &nbsp;
        <Button onClick={handlePopMt100kClick}>Pop &lt; 100k</Button>
        &nbsp;
        <Button onClick={filterNewYork}>New York</Button>
        &nbsp;
        <Button onClick={saveState}>Save State</Button>
        &nbsp;
        <Button disabled={hasSavedState} onClick={restoreState}>
          Restore State
        </Button>
        &nbsp;
        <Button disabled={hasSavedState} onClick={clearState}>
          Clear Stored Filter
        </Button>
      </div>
      <AgGridReact
        defaultColDef={{ floatingFilter: true }}
        onGridReady={onGridReady}
        {...props}
      />
    </div>
  );
};

CustomFilterExample.defaultProps = {
  columnDefs: customFilterExampleColumns,
  rowData: dataGridExampleData,
};

export default function CustomFilter(props: AgGridReactProps) {
  return <CustomFilterExample {...props} />;
}
