import { forwardRef } from "react";
import cx from "classnames";
import { GridItem, GridItemProps } from "../GridItem";

import { makePrefixer } from "@brandname/core";
import { GridAlignment } from "../types";
import "./BorderItem.css";

export const BORDER_POSITION = [
  "header",
  "left",
  "main",
  "right",
  "bottom",
] as const;

export type BorderPosition = typeof BORDER_POSITION[number];

export interface BorderItemProps extends GridItemProps {
  /**
   * Aligns a grid item inside a cell along the inline (row) axis
   */
  justify?: GridAlignment;
  /**
   * Aligns a grid item inside a cell along the block (column) axis
   */
  align?: GridAlignment;
  /**
   * Position in the border layout
   */
  position: BorderPosition;
  /**
   * Defines the item width
   */
  width?: string | number;
  /**
   * Defines the item height
   */
  height?: string | number;
  /**
   * Defines if the item should stick to the edges of its container
   */
  sticky?: boolean;
}

const withBaseName = makePrefixer("uitkBorderItem");

export const BorderItem = forwardRef<HTMLDivElement, BorderItemProps>(
  function BorderItem(
    {
      children,
      className,
      position,
      width,
      height,
      sticky = false,
      style,
      ...rest
    },
    ref
  ) {
    const gridItemStyles = { ...style, width, height };
    return (
      <GridItem
        ref={ref}
        className={cx(withBaseName(), className, {
          [withBaseName("sticky")]: sticky,
        })}
        area={position}
        style={gridItemStyles}
        {...rest}
      >
        {children}
      </GridItem>
    );
  }
);
