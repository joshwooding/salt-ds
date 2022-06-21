import React, {
  Component,
  CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";

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
import { Card } from "@jpmorganchase/uitk-core";
import { Spinner } from "@jpmorganchase/uitk-lab";

const LoadingOverlayExample = function LoadingOverlayExample(
  props: AgGridReactProps
) {
  const [showModal, setShowModal] = useState(true);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState<number | string>("100%");
  const [height, setHeight] = useState<number | string>("100%");

  const gridRef = useRef<AgGridReact>(null);
  const gridApiRef = useRef<GridApi>();

  const [isGridReady, setGridReady] = useState(false);

  useEffect(() => {
    if (isGridReady) {
      gridApiRef.current!.sizeColumnsToFit();
    }
  }, [isGridReady]);

  const onGridReady = ({ api }: GridReadyEvent) => {
    gridApiRef.current = api;
    // const { offsetTop, clientWidth, offsetLeft, clientHeight } =
    //   gridRef.current!;
    // setGridReady(true);
    // setTop(offsetTop);
    // setLeft(offsetLeft);
    // setHeight(clientHeight);
    // setWidth(clientWidth);
  };

  const getModalStyle: CSSProperties = {
    position: "absolute",
    top,
    width: "100%",
    left,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    zIndex: "3",
    textAlign: "center",
  };

  const modal = showModal && (
    <div className="modal" style={getModalStyle}>
      <Card>
        <div>
          <Spinner style={{ margin: "0 auto" }} />
          <div
            aria-atomic="true"
            aria-live="polite"
            style={{ fontSize: "16px", marginTop: "18px" }}
            tabIndex={0}
          >
            Loading...
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div style={{ marginTop: 25, position: "relative" }}>
      {modal}
      <AgGridReact
        ref={gridRef}
        tabIndex={-1}
        // containerProps={{
        //   ref: gridRef,
        //   tabIndex: -1,
        //   'aria-hidden': true
        // }}
        onGridReady={onGridReady}
        {...props}
      />
    </div>
  );
};

LoadingOverlayExample.defaultProps = {
  columnDefs: dataGridExampleColumns,
  rowData: dataGridExampleData,
};

export default function LoadingOverlay(props: AgGridReactProps) {
  return <LoadingOverlayExample {...props} />;
}
