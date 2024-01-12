// WARNING: This file was generated by a script. Do not modify it manually
import { forwardRef } from "react";

import { Icon, IconProps } from "../icon";

export type LayersSolidIconProps = IconProps;

export const LayersSolidIcon = forwardRef<SVGSVGElement, LayersSolidIconProps>(
  function LayersSolidIcon(props: LayersSolidIconProps, ref) {
    return (
      <Icon
        data-testid="LayersSolidIcon"
        aria-label="layers solid"
        viewBox="0 0 12 12"
        ref={ref}
        {...props}
      >
        <path
          fillRule="evenodd"
          d="m0 4 1.5 1L0 6l1.5 1L0 8l6 4 6-4-1.5-1L12 6l-1.5-1L12 4 6 0 0 4Zm9.599 3.6L6 10 2.401 7.6l-.598.4L6 10.798 10.197 8 9.6 7.6ZM1.803 6l.598-.4L6 8l3.599-2.4.598.4L6 8.798 1.803 6Z"
          clipRule="evenodd"
        />
      </Icon>
    );
  }
);