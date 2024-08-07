import { makePrefixer } from "@salt-ds/core";
import { clsx } from "clsx";
import { type HTMLAttributes, forwardRef } from "react";

import { useComponentCssInjection } from "@salt-ds/styles";
import { useWindow } from "@salt-ds/window";

import skipLinksCss from "./SkipLinks.css";

const withBaseName = makePrefixer("saltSkipLinks");

export const SkipLinks = forwardRef<
  HTMLUListElement,
  HTMLAttributes<HTMLUListElement>
>(function SkipLinks(props, ref) {
  const { className, children, ...restProps } = props;
  const targetWindow = useWindow();
  useComponentCssInjection({
    testId: "salt-skip-links",
    css: skipLinksCss,
    window: targetWindow,
  });

  return (
    <ul {...restProps} className={clsx(withBaseName(), className)} ref={ref}>
      {children}
    </ul>
  );
});
