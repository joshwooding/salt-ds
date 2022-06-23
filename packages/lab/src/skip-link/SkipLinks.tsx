import React, { forwardRef } from "react";
import cx from "classnames";

const renderListItem = (child: any) => <li key={child.key}>{child}</li>;

const SkipLinks = forwardRef<HTMLUListElement, HTMLUListElement>(
  ({ className, children, ...restProps }, ref) => {
    const clxPrefix = "uitk";
    return (
      <ul
        {...restProps}
        className={cx(className, clxPrefix + "SkipLinks")}
        ref={ref}
      >
        {React.Children.toArray(children)
          .filter(React.isValidElement)
          .map(renderListItem)}
      </ul>
    );
  }
);
