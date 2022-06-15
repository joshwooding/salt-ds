import { Column, Row } from "../model";
import { CSSProperties, FC, HTMLAttributes } from "react";
import cn from "classnames";
import "./BaseCell.css";
import { Cursor } from "./Cursor";
import { makePrefixer } from "@jpmorganchase/uitk-core";
import { useGridContext } from "../GridContext";

const withBaseName = makePrefixer("uitkGridBaseCell");

export interface BaseCellProps<T = any>
  extends HTMLAttributes<HTMLTableDataCellElement> {
  row: Row<T>;
  column: Column<T>;
  isHoverOverRow?: boolean;
  isSelectedRow?: boolean;
  isSelected?: boolean;
  isFocused?: boolean;
  isAlternate?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function getCellId(row: Row, column: Column) {
  return `R${row.key}C${column.key}`;
}

// The standard wrapper for cell values.
// Takes care of the basic features such as zebra, hover over and selected row highlighting.
// export const BaseCell: FC<BaseCellProps> = memo(function BaseCell(props) {
export const BaseCell: FC<BaseCellProps> = function BaseCell(props) {
  const {
    row,
    column,
    isHoverOverRow,
    isSelectedRow,
    isSelected,
    isFocused,
    isAlternate,
    className,
    style,
    children,
    ...restProps
  } = props;

  const index = row.useIndex();
  const isEditable = column.useIsEditable();
  const { model } = useGridContext();
  const isAllEditable = model.useIsAllEditable();

  return (
    <td
      {...restProps}
      id={getCellId(row, column)}
      data-row-index={index}
      data-column-index={column.index}
      aria-colindex={column.index}
      role="gridcell"
      className={cn(
        withBaseName(),
        {
          [withBaseName("hover")]: isHoverOverRow,
          [withBaseName("selectedRow")]: isSelectedRow,
          [withBaseName("selectedCell")]: isSelected,
          [withBaseName("zebra")]:
            isAlternate && !isSelected && !isSelectedRow && !isHoverOverRow, // TODO css?
          [withBaseName("editable")]: !isAllEditable && isEditable,
          [withBaseName("allEditable")]: isAllEditable && column.index !== 0,
        },
        className
      )}
      style={style}
    >
      {isFocused ? <Cursor /> : null}
      <div className={withBaseName("valueContainer")}>{children}</div>
    </td>
  );
};