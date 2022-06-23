import React, { useEffect, useRef, useState } from "react";

/**
 * Example data can be found here
 * https://bitbucketdc.jpmchase.net/projects/JPMUITK/repos/jpm-ui-toolkit/browse/packages/data-grid/examples/dependencies
 */
import dataGridExampleData from "../dependencies/dataGridExampleData";
import dataGridInfiniteScrollExampleColumns from "../dependencies/dataGridInfiniteScrollExampleColumns";

// ideally these css files would be loaded from a link tag
// pointing to static asset directory for caching
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";

const generateData = function generateData<T extends { name: string }>(
  lst: T[]
) {
  return lst.reduce((result, row) => {
    const data = [];
    data.push(row);
    for (let i = 0; i < 20; i++) {
      const o = { ...row, name: `${row.name} ${i}` };
      data.push(o);
    }
    return [...result, ...data];
  }, [] as T[]);
};

const dataSourceRows = generateData(dataGridExampleData);

const InfiniteScrollExample = function InfiniteScrollExample(
  props: AgGridReactProps
) {
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

    api.setDatasource({
      getRows: ({ startRow, endRow, successCallback }) => {
        setTimeout(() => {
          successCallback(
            dataSourceRows.slice(startRow, endRow),
            dataSourceRows.length
          );
        }, 500);
      },
    });
  };

  return (
    <div style={{ marginTop: 25 }}>
      <AgGridReact onGridReady={onGridReady} {...props} />
    </div>
  );
};

InfiniteScrollExample.defaultProps = {
  columnDefs: dataGridInfiniteScrollExampleColumns,
  components: {
    loadingRenderer(params) {
      if (params.value !== undefined) {
        return params.value;
      } else {
        return '<div aria-label="loading" class="jpm-ui-toolkit-cssSpinner small" role="status"><div class="dot1"></div><div class="dot2"></div><div class="dot3"></div></div>';
      }
    },
  },
  rowModelType: "infinite",
  infiniteInitialRowCount: 100,
} as AgGridReactProps;

export default function InfiniteScroll(props: AgGridReactProps) {
  return <InfiniteScrollExample {...props} />;
}
