import { Ref, RefObject, useEffect, useMemo, useRef, useState } from "react";

const FOCUS_TIMEOUT = 50;

export const useManageFocusOnTarget = ({
  targetRef,
}: {
  targetRef: Ref<HTMLElement> | HTMLElement | undefined;
}) => {
  const [target, setTarget] = useState<HTMLElement>();

  const hasTabIndex = useRef<boolean | string>();
  const shouldRemoveTabIndex = useRef<boolean>();

  useEffect(() => {
    if (targetRef) {
      setTarget((targetRef as RefObject<any>).current || targetRef);
    }
  }, [targetRef]);

  return useMemo(() => {
    if (!target) {
      return {};
    }

    const addTabIndex = () => {
      const tabIndex = target.getAttribute("tabIndex");
      hasTabIndex.current = tabIndex || tabIndex === "0";

      if (!hasTabIndex.current) {
        shouldRemoveTabIndex.current = true;
        target.setAttribute("tabIndex", "-1");
      }
    };

    const removeTabIndex = () => {
      if (!hasTabIndex.current && shouldRemoveTabIndex.current) {
        target.removeAttribute("tabIndex");
      }
    };

    const handleFocusOnTarget = () => {
      shouldRemoveTabIndex.current = false;
      console.log(target);
      // target.classList.add("uitkFocusVisible");
    };

    const handleBlurFromTarget = () => {
      shouldRemoveTabIndex.current = true;
      removeTabIndex();
      // target.classList.remove("uitkFocusVisible");
    };

    return {
      onBlur: () => setTimeout(removeTabIndex, FOCUS_TIMEOUT),
      onClick: () => {
        addTabIndex();
        setTimeout(() => {
          target.focus();

          console.log(document.activeElement);
        }, FOCUS_TIMEOUT);

        target.addEventListener("focus", handleFocusOnTarget, { once: true });
        target.addEventListener("blur", handleBlurFromTarget, { once: true });
      },
    };
  }, [target]);
};
