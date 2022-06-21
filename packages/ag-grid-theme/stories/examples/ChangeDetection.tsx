import React, { useEffect, useRef, useState } from "react";
import { Button } from "@jpmorganchase/uitk-core";

/**
 * Example data can be found here
 * https://bitbucketdc.jpmchase.net/projects/JPMUITK/repos/jpm-ui-toolkit/browse/packages/data-grid/examples/dependencies
 */
import changeDetectionExampleColumns from "../dependencies/changeDetectionExampleColumns";

// ideally these css files would be loaded from a link tag
// pointing to static asset directory for caching
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { GridApi, GridReadyEvent, RowNode } from "ag-grid-community";

const ChangeDetectionExample = function ChangeDetectionExample(
  props: AgGridReactProps
) {
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

  const updateOneRecord = () => {
    const rowNodeToUpdate = pickExistingRowNodeAtRandom(gridApiRef.current!);
    const randomValue = createRandomNumber();
    const randomColumnId = pickRandomColumn();
    rowNodeToUpdate?.setDataValue(randomColumnId, randomValue);
  };

  const updateUsingTransaction = () => {
    const itemToUpdate = pickExistingRowItemAtRandom(gridApiRef.current!);
    if (!itemToUpdate) {
      return;
    }
    itemToUpdate[pickRandomColumn()] = createRandomNumber();
    itemToUpdate[pickRandomColumn()] = createRandomNumber();
    const transaction = { update: [itemToUpdate] };
    gridApiRef.current?.updateRowData(transaction);
  };

  const removeUsingTransaction = () => {
    const itemToRemove = pickExistingRowItemAtRandom(gridApiRef.current!);
    if (!itemToRemove) {
      return;
    }
    const transaction = { remove: [itemToRemove] };
    console.log("removing", itemToRemove);
    gridApiRef.current?.updateRowData(transaction);
  };

  const addUsingTransaction = () => {
    const i = Math.floor(Math.random() * 2);
    const j = Math.floor(Math.random() * 5);
    const k = Math.floor(Math.random() * 3);
    const newItem = createRowItem(i, j, k);
    const transaction = { add: [newItem] };
    console.log("adding", newItem);
    gridApiRef.current?.updateRowData(transaction);
  };

  const changeGroupUsingTransaction = () => {
    const itemToUpdate = pickExistingRowItemAtRandom(gridApiRef.current!);
    if (!itemToUpdate) {
      return;
    }
    itemToUpdate.topGroup = itemToUpdate.topGroup === "Top" ? "Bottom" : "Top";
    const transaction = { update: [itemToUpdate] };
    console.log("updating", itemToUpdate);
    gridApiRef.current?.updateRowData(transaction);
  };

  return (
    <div style={{ marginTop: 25 }}>
      <Button onClick={updateOneRecord}>Update One Value</Button>
      &nbsp;
      <Button onClick={updateUsingTransaction}>Update Using Transaction</Button>
      &nbsp;
      <Button onClick={removeUsingTransaction}>Remove Using Transaction</Button>
      &nbsp;
      <Button onClick={addUsingTransaction}>Add Using Transaction</Button>
      &nbsp;
      <Button onClick={changeGroupUsingTransaction}>
        Change Group Using Transaction
      </Button>
      <AgGridReact
        animateRows
        enableCellChangeFlash
        onGridReady={onGridReady}
        suppressAggFuncInHeader
        {...props}
      />
    </div>
  );
};

const getRowData = () => {
  const rowData = [];
  for (let i = 1; i <= 20; i++) {
    rowData.push({
      group: i < 5 ? "A" : "B",
      a: (i * 863) % 100,
      b: (i * 811) % 100,
      c: (i * 743) % 100,
      d: (i * 677) % 100,
      e: (i * 619) % 100,
      f: (i * 571) % 100,
    });
  }
  return rowData;
};

interface RowDataItem {
  id: number;
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
  topGroup?: string;
  group?: string;
}

let rowIdCounter = 0;
const createRowItem = (i: number, j: number, k: number): RowDataItem => {
  const rowDataItem: RowDataItem = {
    id: rowIdCounter++,
    a: (j * k * 863) % 100,
    b: (j * k * 811) % 100,
    c: (j * k * 743) % 100,
    d: (j * k * 677) % 100,
    e: (j * k * 619) % 100,
    f: (j * k * 571) % 100,
  };
  if (i === 1) {
    rowDataItem.topGroup = "Top";
    rowDataItem.group = `Group A${j}`;
  } else {
    rowDataItem.topGroup = "Bottom";
    rowDataItem.group = `Group B${j}`;
  }
  return rowDataItem;
};

const pickRandomColumn = () => {
  const letters = ["a", "b", "c", "d", "e", "f"];
  const randomIndex = Math.floor(Math.random() * letters.length);
  return letters[randomIndex];
};
const createRandomNumber = () => Math.floor(Math.random() * 100);

const pickExistingRowItemAtRandom = (gridApi: GridApi) => {
  const rowNode = pickExistingRowNodeAtRandom(gridApi);
  return rowNode ? rowNode.data : null;
};

const pickExistingRowNodeAtRandom = (gridApi: GridApi): RowNode | undefined => {
  const allItems: RowNode[] = [];
  gridApi.forEachLeafNode((rowNode) => {
    allItems.push(rowNode);
  });
  if (allItems.length === 0) {
    return;
  }
  return allItems[Math.floor(Math.random() * allItems.length)];
};

ChangeDetectionExample.defaultProps = {
  columnDefs: changeDetectionExampleColumns,
  columnTypes: {
    valueColumn: {
      editable: true,
      aggFunc: "sum",
      valueParser: "Number(newValue)",
      filter: "agNumberColumnFilter",
    },
  },
  groupDefaultExpanded: 1,
  rowData: getRowData(),
};

export default function ChangeDetection(props: AgGridReactProps) {
  return <ChangeDetectionExample {...props} />;
}
