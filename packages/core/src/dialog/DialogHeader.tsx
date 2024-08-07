import { useComponentCssInjection } from "@salt-ds/styles";
import { useWindow } from "@salt-ds/window";
import clsx from "clsx";
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  forwardRef,
} from "react";
import { StatusIndicator, type ValidationStatus } from "../status-indicator";
import { H2, Text } from "../text";
import { makePrefixer } from "../utils";
import { useDialogContext } from "./DialogContext";
import dialogHeaderCss from "./DialogHeader.css";

const withBaseName = makePrefixer("saltDialogHeader");

export interface DialogHeaderProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * The status of the Dialog
   */
  status?: ValidationStatus | undefined;
  /**
   * Displays the accent bar in the Dialog Title */
  disableAccent?: boolean;
  /**
   * Displays the header at the top of the Dialog
   */
  header: ReactNode;
  /**
   * Displays the preheader just above the header
   **/
  preheader?: ReactNode;
}

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  function DialogHeader(props, ref) {
    const {
      className,
      header,
      preheader,
      disableAccent,
      status: statusProp,
      ...rest
    } = props;
    const { status: statusContext, id } = useDialogContext();

    const targetWindow = useWindow();
    useComponentCssInjection({
      testId: "salt-dialog-header",
      css: dialogHeaderCss,
      window: targetWindow,
    });

    const status = statusProp ?? statusContext;

    return (
      <div
        id={id}
        className={clsx(
          withBaseName(),
          {
            [withBaseName("withAccent")]: !disableAccent && !status,
            [withBaseName(status ?? "")]: !!status,
          },
          className,
        )}
        ref={ref}
        {...rest}
      >
        {status && <StatusIndicator status={status} />}
        <H2 className={withBaseName("header")}>
          {preheader && (
            <Text variant="secondary" className={withBaseName("preheader")}>
              {preheader}
            </Text>
          )}
          <div>{header}</div>
        </H2>
      </div>
    );
  },
);
