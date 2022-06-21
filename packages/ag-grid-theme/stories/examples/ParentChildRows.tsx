import React, { useEffect, useRef, useState } from "react";

/**
 * Example data can be found here
 * https://bitbucketdc.jpmchase.net/projects/JPMUITK/repos/jpm-ui-toolkit/browse/packages/data-grid/examples/dependencies
 */
import parentChildExampleColumns from "../dependencies/parentChildExampleColumns";
import parentChildExampleData from "../dependencies/parentChildExampleData";

// ideally these css files would be loaded from a link tag
// pointing to static asset directory for caching
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { GridApi, GridReadyEvent } from "ag-grid-community";

const ParentChildRowsExample = function ParentChildRowsExample(
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
  };

  return (
    <div style={{ marginTop: 25 }}>
      <AgGridReact animateRows onGridReady={onGridReady} treeData {...props} />
    </div>
  );
};

ParentChildRowsExample.defaultProps = {
  columnDefs: parentChildExampleColumns,
  getDataPath(data: any) {
    return data.orgHierarchy;
  },
  groupDefaultExpanded: -1,
  rowData: parentChildExampleData,
};

export default function ParentChildRows(props: AgGridReactProps) {
  return <ParentChildRowsExample {...props} />;
}
