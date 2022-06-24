import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { AgGridReactProps } from "ag-grid-react";
import { ColumnApi, GridApi, GridReadyEvent } from "ag-grid-community";
import { useAgGridRowHeight } from "./useAgGridRowHeight";
import { useDensity } from "@jpmorganchase/uitk-core";

// Helps to set className, rowHeight and headerHeight depending on the current density
export function useAgGridHelpers(): {
  containerProps: HTMLAttributes<HTMLDivElement>;
  agGridProps: AgGridReactProps;
  isGridReady: boolean;
  api?: GridApi;
  columnApi?: ColumnApi;
} {
  const apiRef = useRef<{ api: GridApi; columnApi: ColumnApi }>();
  const [isGridReady, setGridReady] = useState(false);
  const rowHeight = useAgGridRowHeight();
  const density = useDensity();
  const className = `ag-theme-uitk-${density}`;

  const onGridReady = ({ api, columnApi }: GridReadyEvent) => {
    apiRef.current = { api, columnApi };
    api.sizeColumnsToFit();
    setGridReady(true);
  };

  useEffect(() => {
    if (isGridReady) {
      apiRef.current!.api.resetRowHeights();
    }
  }, [rowHeight, isGridReady]);

  return {
    containerProps: {
      className,
    },
    agGridProps: {
      onGridReady,
      rowHeight,
      headerHeight: rowHeight,
    },
    isGridReady,
    api: apiRef.current?.api,
    columnApi: apiRef.current?.columnApi,
  };
}
