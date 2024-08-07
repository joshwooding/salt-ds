// WARNING: This file was generated by a script. Do not modify it manually

import { forwardRef } from "react";

import { Icon, type IconProps } from "../icon";

export type MedicalKitIconProps = IconProps;

export const MedicalKitIcon = forwardRef<SVGSVGElement, MedicalKitIconProps>(
  function MedicalKitIcon(props: MedicalKitIconProps, ref) {
    return (
      <Icon
        data-testid="MedicalKitIcon"
        aria-label="medical kit"
        viewBox="0 0 12 12"
        ref={ref}
        {...props}
      >
        <path
          fillRule="evenodd"
          d="M11 2H1v8h10V2ZM0 1v10h12V1H0Z"
          clipRule="evenodd"
        />
        <path d="M5 7v1h2V7h1V5H7V4H5v1H4v2h1Z" />
        <path
          fillRule="evenodd"
          d="M2 10V2h1v8H2Zm7 0V2h1v8H9Z"
          clipRule="evenodd"
        />
      </Icon>
    );
  },
);
