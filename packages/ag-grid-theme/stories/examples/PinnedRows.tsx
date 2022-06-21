import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

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
import { GridApi, GridReadyEvent } from "ag-grid-community";

const sumReducer = (acc: number, n: number) => acc + n;
const minReducer = (acc: number, n: number) => (n < acc ? n : acc);
const maxReducer = (acc: number, n: number) => (n > acc ? n : acc);

const sum = (vals: number[]) => vals.reduce(sumReducer, 0);
const min = (vals: number[]) => vals.reduce(minReducer, 0);
const max = (vals: number[]) => vals.reduce(maxReducer, 0);

export const aggregates = {
  sum,
  min,
  max,
};

const fields = function <T>(fieldName: keyof T, rows: T[]) {
  return rows.map((row) => row[fieldName]);
};

const headerRow: any[] = [
  {
    name: "Top",
    code: "Top",
    capital: "Top",
    population: "Top",
  },
];

type PinnedRowsExampleProps = AgGridReactProps & {
  aggregateColumn: string;
  aggregate: "sum" | "min" | "max";
  showFooter: boolean;
  showHeader: boolean;
};

const PinnedRowsExample = function PinnedRowsExample(
  props: PinnedRowsExampleProps
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
  };

  const getColumnData = () => {
    return fields(props.aggregateColumn, props.rowData!).filter(
      (field) => typeof field === "number"
    );
  };

  const footerRow = () => {
    const columnData = getColumnData();
    const fn = aggregates[props.aggregate];
    const population = fn(columnData);
    return [
      {
        name: "Summary",
        code: "",
        capital: "",
        population,
      },
    ];
  };

  const getHeaderRow = () => {
    return headerRow;
  };

  const pinnedBottomRowData = props.showFooter ? footerRow() : undefined;
  const pinnedTopRowData = props.showHeader ? getHeaderRow() : undefined;
  return (
    <div style={{ marginTop: 25 }}>
      <AgGridReact
        onGridReady={onGridReady}
        {...props}
        pinnedBottomRowData={pinnedBottomRowData}
        pinnedTopRowData={pinnedTopRowData}
      />
    </div>
  );
};

PinnedRowsExample.propTypes = {
  aggregate: PropTypes.string,
  aggregateColumn: PropTypes.string,
  rowData: PropTypes.arrayOf(PropTypes.object),
  showFooter: PropTypes.bool,
  showHeader: PropTypes.bool,
};

PinnedRowsExample.defaultProps = {
  aggregate: "sum",
  aggregateColumn: "population",
  columnDefs: dataGridExampleColumns,
  rowData: dataGridExampleData,
  showFooter: true,
  showHeader: true,
};

export default function PinnedRows(props: PinnedRowsExampleProps) {
  return <PinnedRowsExample {...props} />;
}
