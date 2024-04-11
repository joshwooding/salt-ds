// WARNING: This file was generated by a script. Do not modify it manually
import { forwardRef } from "react";

import { Icon, IconProps } from "../icon";

export type MicrophoneIconProps = IconProps;

export const MicrophoneIcon = forwardRef<SVGSVGElement, MicrophoneIconProps>(
  function MicrophoneIcon(props: MicrophoneIconProps, ref) {
    return (
      <Icon
        data-testid="MicrophoneIcon"
        aria-label="microphone"
        viewBox="0 0 12 12"
        ref={ref}
        {...props}
      >
        <path
          fillRule="evenodd"
          d="M6 0a2.5 2.5 0 0 0-2.5 2.5v3a2.5 2.5 0 0 0 5 0v-3A2.5 2.5 0 0 0 6 0Zm1.5 5.5v-3a1.5 1.5 0 1 0-3 0v3a1.5 1.5 0 1 0 3 0Z"
          clipRule="evenodd"
        />
        <path d="M2.5 5.5a3.5 3.5 0 1 0 7 0h1a4.5 4.5 0 0 1-4 4.473V11H9v1H3v-1h2.5V9.973a4.5 4.5 0 0 1-4-4.473h1Z" />
      </Icon>
    );
  }
);