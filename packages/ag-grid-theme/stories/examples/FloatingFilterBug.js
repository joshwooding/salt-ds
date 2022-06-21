import React, { useState, useCallback } from 'react';
import { DataGrid } from '@jpmuitk/data-grid';
import { Button } from '@jpmuitk/button';
import '@jpmuitk/style/css/jpmuitk.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { LicenseManager } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';

LicenseManager.setLicenseKey(
  'CompanyName=JPMorgan Chase (Jersey City, NJ),LicensedGroup=CIB Markets- UI,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=10,LicensedProductionInstancesCount=0,AssetReference=AG-009705,ExpiryDate=21_August_2021_[v2]_MTYyOTUwMDQwMDAwMA==9a3e565915700ff08306430ea11b90c4'
);

const dataGridExampleColumns = [
  {
    headerName: 'State',
    field: 'state',
    filter: 'agTextColumnFilter',
    floatingFilter: false
  },
  {
    headerName: 'City',
    field: 'city',
    filter: 'agTextColumnFilter',
    floatingFilter: false
  },
  {
    headerName: 'Population',
    type: 'numericColumn',
    field: 'population',
    filter: 'agNumberColumnFilter',
    editable: true,
    cellClass: ['editable-numeric-cell'],
    floatingFilter: false
  }
];

const dataGridExampleData = [
  {
    state: 'TX',
    city: 'Houston',
    population: 8446790,
    path: ['TX', 'Houston']
  },
  { state: 'TX', city: 'Dallas', population: 7466990, path: ['TX', 'Dallas'] },
  { state: 'CA', city: 'San F', population: 5654855, path: ['CA', 'San F'] },
  { state: 'CA', city: 'Los A', population: 9966990, path: ['CA', 'Los A'] }
];

const Grid = ({
  rowData,
  columns,
  showFilter,
  showColumnsFilter,
  showAutoGroupColFilter
}) => {
  const clonedColumns = columns.map(col => {
    return { ...col, floatingFilter: showFilter || showColumnsFilter };
  });

  return (
    <DataGrid
      treeData={true}
      getDataPath={data => data.path}
      // defaultColDef={{floatingFilter: true}}
      autoGroupColumnDef={{
        headerName: 'Header',
        minWidth: 100,
        filter: 'agTextColumnFilter',
        floatingFilter: showFilter || showAutoGroupColFilter
      }}
      columnDefs={clonedColumns}
      rowData={rowData}
    />
  );
};

const App = props => {
  const [showFilter, setShowFilter] = useState(false);
  const [showColumnsFilter, setShowColumnsFilter] = useState(false);
  const [showAutoGroupColFilter, setShowAutoGroupColFilter] = useState(false);

  const onToggleFilter = useCallback(
    e => {
      setShowFilter(val => !val);
    },
    [setShowFilter]
  );
  const onToggleColumnsFilter = useCallback(
    e => {
      setShowColumnsFilter(val => !val);
    },
    [setShowColumnsFilter]
  );
  const onToggleAutoGroupColFilter = useCallback(
    e => {
      setShowAutoGroupColFilter(val => !val);
    },
    [setShowAutoGroupColFilter]
  );
  return (
    <div>
      <Button
        style={{ margin: '10px', color: showFilter ? 'red' : undefined }}
        onClick={onToggleFilter}
      >
        Toggle All Filter
      </Button>
      <Button
        style={{ margin: '10px', color: showColumnsFilter ? 'red' : undefined }}
        onClick={onToggleColumnsFilter}
      >
        Toggle Columns Filter
      </Button>
      <Button
        style={{
          margin: '10px',
          color: showAutoGroupColFilter ? 'red' : undefined
        }}
        onClick={onToggleAutoGroupColFilter}
      >
        Toggle AutoGroup Column Filter
      </Button>
      <Grid
        rowData={dataGridExampleData}
        columns={dataGridExampleColumns}
        showFilter={showFilter}
        showColumnsFilter={showColumnsFilter}
        showAutoGroupColFilter={showAutoGroupColFilter}
      />
    </div>
  );
};

export default App;
