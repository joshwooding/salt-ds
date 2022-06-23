import { useDensity } from "@jpmorganchase/uitk-core";
import { useMemo } from "react";

export function useAgGridRowHeight() {
  const density = useDensity();
  return useMemo(() => {
    switch (density) {
      case "high":
        return 24;
      case "medium":
        return 36;
      case "low":
        return 48;
      case "touch":
        return 60;
      default:
        return 24;
    }
  }, [density]);
}
