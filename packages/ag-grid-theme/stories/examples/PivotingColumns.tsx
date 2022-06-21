import React, { Component } from "react";
import { DataGrid } from "@jpmuitk/data-grid";

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

class PivotingColumnsExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: "Name",
          field: "name",
          width: 120,
          rowGroup: true,
          enableRowGroup: true,
        },
        {
          headerName: "Code",
          field: "code",
          width: 90,
          pivot: true,
          enablePivot: true,
        },
        {
          headerName: "Capital",
          field: "capital",
          width: 110,
          enablePivot: true,
          enableRowGroup: true,
        },
        {
          headerName: "Population",
          field: "population",
          width: 110,
          enablePivot: true,
          enableRowGroup: true,
        },
      ],
      defaultColDef: {
        resizable: true,
        filter: true,
        enableValue: true,
        enableRowGroup: true,
        enablePivot: true,
        sortable: true,
      },
      rowData: [],
    };
  }

  state = { isGridReady: false };

  componentDidUpdate(prevProps, prevState) {
    // Side effects (e.g. operating on the DOM) are only safe in `componentDidMount` or `componentDidUpdate`.
    // See https://github.com/reactjs/rfcs/blob/master/text/0006-static-lifecycle-methods.md#external-function-calls-side-effects-mutations
    // and https://reactjs.org/docs/react-component.html#componentdidupdate
    if (prevState.isGridReady !== this.state.isGridReady) {
      this.gridApi.sizeColumnsToFit();
    }
  }

  onGridReady = ({ api }) => {
    this.gridApi = api;
    this.setState({ isGridReady: true });
  };

  render() {
    return (
      <div style={{ marginTop: 25 }}>
        <DataGrid
          columnDefs={this.state.columnDefs}
          defaultColDef={this.state.defaultColDef}
          enablePivot
          onGridReady={this.onGridReady}
          rowData={dataGridExampleData}
          sideBar
          {...this.props}
        />
      </div>
    );
  }
}

PivotingColumnsExample.defaultProps = {
  columnDefs: dataGridExampleColumns,
  rowData: dataGridExampleData,
};

export default function PivotingColumns(props) {
  return <PivotingColumnsExample {...props} />;
}
