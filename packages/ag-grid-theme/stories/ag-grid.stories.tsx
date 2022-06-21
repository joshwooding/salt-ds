/**
 * This file replaces the previous index.story.js file
 * which used Storybook v4 'storiesOf' API.
 */
export default {
  title: 'Ag Grid Theme',
  component: DataGrid,
  decorators: [withFixedWidthWrapper, withRowStripsKnob]
};

export {
  Default as BasicGrid,
  AddRemoveRows,
  AggregateValues,
  CellDropdownEditor,
  ChangeDetection,
  CheckboxSelection,
  Coloration,
  ColumnGroup,
  ColumnSpanning,
  ContextMenu,
  CustomFilter,
  CustomPagination,
  DragRowOrder,
  ExcelExport,
  FloatingFilter,
  FloatingFilterBug,
  InfiniteScroll,
  LoadingOverlay,
  MasterDetail,
  NoDataOverlay,
  Pagination,
  ParentChildRows,
  RowGrouping,
  RowGroupingWithPagination,
  RowGroupPanel,
  SetFilter,
  SingleClickEdit,
  StatusBar
} from '../examples';
