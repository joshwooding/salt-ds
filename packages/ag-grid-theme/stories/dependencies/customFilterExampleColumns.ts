const customFilterExampleColumns = [
  {
    headerName: 'Name',
    field: 'name',
    filter: 'agTextColumnFilter',
    suppressMenu: true
  },
  {
    headerName: 'Code',
    field: 'code',
    filter: 'agTextColumnFilter',
    minWidth: 120,
    suppressMenu: true
  },
  {
    headerName: 'Capital',
    field: 'capital',
    filter: 'agTextColumnFilter',
    suppressMenu: true
  },
  {
    headerName: 'Population',
    field: 'population',
    filter: 'agNumberColumnFilter',
    suppressMenu: true
  }
];

export default customFilterExampleColumns;
