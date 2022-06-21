import React, { Component, useRef, useState } from "react";

import dataGridExampleColumns from "../dependencies/dataGridExampleColumns";
import dataGridExampleData from "../dependencies/dataGridExampleData";
// ideally these css files would be loaded from a link tag
// pointing to static asset directory for caching
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { ColDef, ColumnApi, GridApi, GridReadyEvent } from "ag-grid-community";
import { Button } from "@jpmorganchase/uitk-core";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";

export default {
  title: "Ag Grid Theme",
  component: AgGridReact,
};

const AddRemoveRowsExample = function AddRemoveRowsExample(
  props: AgGridReactProps
) {
  const [isGridReady, setIsGridReady] = useState<boolean>(false);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>(
    dataGridExampleColumns
  );
  const [defaultColDef, setDefaultColDef] = useState<ColDef>({
    editable: true,
  });
  const [disabledButton, setDisabledButton] = useState<boolean>(true);

  const gridApiRef = useRef<GridApi>();
  const columnApiRef = useRef<ColumnApi>();

  const onGridReady = (event: GridReadyEvent) => {
    const { api, columnApi } = event;

    setIsGridReady(true);
    gridApiRef.current = api;
    columnApiRef.current = columnApi;
  };

  const handleAddRow = () => {
    const addRowButton = document.querySelector(
      '[data-button="addRow"]'
    ) as HTMLButtonElement;
    addRowButton.blur();
    gridApiRef.current!.ensureIndexVisible(0, "top");
    gridApiRef.current!.updateRowData({
      add: [
        {
          name: "",
          code: "",
          capital: "",
          population: "",
        },
      ],
      addIndex: 0,
    });
    const firstColumn = columnApiRef.current!.getAllColumns()![0].getColId();
    gridApiRef.current!.setFocusedCell(0, firstColumn, "top");
    setTimeout(() => {
      gridApiRef.current!.startEditingCell({
        rowIndex: 0,
        colKey: firstColumn,
      });
    }, 50);
  };

  const handleRemoveSelected = () => {
    const gridApi = gridApiRef.current!;
    const columnApi = columnApiRef.current!;

    const rowNumber = gridApi.getSelectedNodes()[0].rowIndex as number;
    const firstColumn = columnApi.getAllColumns()![0].getColId();
    gridApi.setFocusedCell(rowNumber, firstColumn, "top");
    gridApi.updateRowData({ remove: gridApi.getSelectedRows() });
    setTimeout(() => {
      gridApi.startEditingCell({
        rowIndex: rowNumber,
        colKey: firstColumn,
      });
    }, 50);
  };

  const onSelectionChanged = () => {
    const gridApi = gridApiRef.current!;

    gridApi.getSelectedRows().length !== 0
      ? setDisabledButton(false)
      : setDisabledButton(true);
  };

  return (
    <div style={{ marginTop: 25 }}>
      <AgGridReact
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        onSelectionChanged={onSelectionChanged}
        {...props}
      />
      <Button
        aria-label="add row"
        data-button="addRow"
        onClick={handleAddRow}
        style={{ marginRight: 10 }}
        tabIndex={0}
      >
        Add Row
      </Button>
      <Button
        aria-label="remove row"
        disabled={disabledButton}
        onClick={handleRemoveSelected}
        tabIndex={0}
      >
        Remove Row
      </Button>
    </div>
  );
};

AddRemoveRowsExample.defaultProps = {
  rowData: dataGridExampleData,
};

export function AddRemoveRows(props: AgGridReactProps) {
  return <AddRemoveRowsExample {...props} />;
}
