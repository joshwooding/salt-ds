import React, { useEffect, useRef, useState, forwardRef, Ref } from "react";
import PropTypes from "prop-types";
import { Pagination, Paginator } from "@jpmorganchase/uitk-lab";

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
import { GridApi } from "ag-grid-community";
import {
  AriaAnnouncerProvider,
  useDensity,
  useTheme,
} from "@jpmorganchase/uitk-core";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";

const generateData = (states) =>
  states.reduce((result, row) => {
    const data = [];
    data.push(row);
    for (let i = 0; i < 20; i++) {
      data.push({ ...row, name: `${row.name} ${i}` });
    }
    return [...result, ...data];
  }, []);

interface CustomPagerProps {
  currentPage: number;
  onGoToPage: (page: number) => void;
  totalPages: number;
  gridApi: GridApi;
}

const CustomPager = forwardRef(function CustomPager(
  props: CustomPagerProps,
  ref: Ref<HTMLElement>
) {
  const { currentPage, onGoToPage, totalPages, gridApi } = props;

  const density = useDensity();
  const { toolkit: toolkitTheme } = useTheme();

  const handlePageChange = (newPage: number) => {
    onGoToPage(newPage - 1);
  };

  React.useEffect(() => {
    const handleKeyDown = ({ event }) => {
      if (event.altKey) {
        switch (event.key) {
          case "PageUp":
            onGoToPage(Math.min(currentPage + 1, totalPages - 1));
            event.preventDefault();
            break;
          case "PageDown":
            onGoToPage(Math.max(currentPage - 1, 0));
            event.preventDefault();
            break;
          default:
        }
      }
    };

    gridApi.addEventListener("cellKeyDown", handleKeyDown);

    return () => {
      gridApi.removeEventListener("cellKeyDown", handleKeyDown);
    };
  }, [currentPage, gridApi, onGoToPage, totalPages]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: toolkitTheme.spacing[density].spacing(1),
      }}
    >
      <AriaAnnouncerProvider>
        <Pagination
          count={totalPages}
          onPageChange={handlePageChange}
          page={currentPage + 1}
          ref={ref}
        >
          <Paginator />
        </Pagination>
      </AriaAnnouncerProvider>
    </div>
  );
});

CustomPager.propTypes = {
  currentPage: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  gridApi: PropTypes.object,
  onGoToPage: PropTypes.func,
  totalPages: PropTypes.number,
};

const PagedGrid = ({
  columnDefs = dataGridExampleColumns,
  rowData = generateData(dataGridExampleData),
  gridDescription,
  ...rest
}) => {
  const [isGridReady, setIsGridReady] = useState(false);
  const gridApiRef = useRef();

  useEffect(() => {
    if (isGridReady) {
      gridApiRef.current!.sizeColumnsToFit();
    }
  }, [isGridReady]);

  const handleGridReady = ({ api }) => {
    gridApiRef.current = api;
    setIsGridReady(true);
  };

  return (
    <>
      <h1>{gridDescription}</h1>
      <AgGridReact
        columnDefs={columnDefs}
        // TODO gridDescription={gridDescription}
        onGridReady={handleGridReady}
        pager={CustomPager}
        pagination
        paginationPageSize={100}
        rowData={rowData}
        {...rest}
      />
    </>
  );
};

PagedGrid.propTypes = {
  columnDefs: PropTypes.arrayOf(PropTypes.object),
  gridDescription: PropTypes.string,
  rowData: PropTypes.arrayOf(PropTypes.object),
};

const CustomPaginationExample = () => (
  <div
    style={{
      marginTop: "-150px",
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <PagedGrid gridDescription="example grid 1" />
  </div>
);

export default function CustomPagination() {
  return <CustomPaginationExample />;
}
