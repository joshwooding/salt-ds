import React, { Component, useEffect, useRef, useState } from "react";

// ideally these css files would be loaded from a link tag
// pointing to static asset directory for caching
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import { Button } from "@jpmorganchase/uitk-core";

const RefreshGridContentExample = function RefreshGridContentExample(
  props: AgGridReactProps
) {
  const [isGridReady, setGridReady] = useState(false);
  const apiRef = useRef<GridApi>();
  useEffect(() => {
    if (isGridReady) {
      apiRef.current!.sizeColumnsToFit();
    }
  }, [isGridReady]);

  const onGridReady = ({ api }: GridReadyEvent) => {
    apiRef.current = api;
    setGridReady(true);
  };

  const onUpdateSomeValues = () => {
    const rowCount = apiRef.current!.getDisplayedRowCount();
    for (let i = 0; i < 20; i++) {
      const row = Math.floor(Math.random() * rowCount);
      const rowNode = apiRef.current!.getDisplayedRowAtIndex(row)!;
      const col = ["a", "b", "c", "d", "e", "f"][i % 6];
      rowNode.setDataValue(col, Math.floor(Math.random() * 10000));
    }
  };

  const onFlashOneCell = () => {
    const rowNode = apiRef.current!.getDisplayedRowAtIndex(4)!;
    apiRef.current!.flashCells({
      rowNodes: [rowNode],
      columns: ["c"],
    });
  };

  const onFlashTwoColumns = () => {
    apiRef.current!.flashCells({
      columns: ["c", "d"],
    });
  };

  const onFlashTwoRows = () => {
    const rowNode1 = apiRef.current!.getDisplayedRowAtIndex(4)!;
    const rowNode2 = apiRef.current!.getDisplayedRowAtIndex(5)!;
    apiRef.current!.flashCells({
      rowNodes: [rowNode1, rowNode2],
    });
  };

  return (
    <div>
      <Button onClick={onUpdateSomeValues}>Update Some Data</Button>
      &nbsp;&nbsp;&nbsp;
      <Button onClick={onFlashOneCell}>Flash One Cell</Button>
      &nbsp;&nbsp;&nbsp;
      <Button onClick={onFlashTwoRows}>Flash Two Rows</Button>
      &nbsp;&nbsp;&nbsp;
      <Button onClick={onFlashTwoColumns}>Flash Two Columns</Button>
      <div style={{ marginTop: 25 }}>
        <AgGridReact
          columnDefs={props.columnDefs}
          masterDetail
          onGridReady={onGridReady}
          {...props}
        />
      </div>
    </div>
  );
};

function createRowData() {
  const rowData = [];
  for (let i = 0; i < 20; i++) {
    rowData.push({
      a: Math.floor(((i + 323) * 25435) % 10000),
      b: Math.floor(((i + 323) * 23221) % 10000),
      c: Math.floor(((i + 323) * 468276) % 10000),
      d: 0,
      e: 0,
      f: 0,
    });
  }
  return rowData;
}

RefreshGridContentExample.defaultProps = {
  columnDefs: [
    {
      headerName: "A",
      field: "a",
    },
    {
      headerName: "B",
      field: "b",
    },
    {
      headerName: "C",
      field: "c",
    },
    {
      headerName: "D",
      field: "d",
    },
    {
      headerName: "E",
      field: "e",
    },
    {
      headerName: "F",
      field: "f",
    },
  ],
  rowData: createRowData(),
  enableCellChangeFlash: true,
};

export default function RefreshGridContent(props: AgGridReactProps) {
  return <RefreshGridContentExample {...props} />;
}
