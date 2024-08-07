import type { PreProps } from "@jpmorganchase/mosaic-components";
import {
  Pre as InnerPre,
  withMarkdownSpacing,
} from "@jpmorganchase/mosaic-components";
import type { FC, PropsWithChildren } from "react";
import styles from "./Pre.module.css";

const MosaicPre = withMarkdownSpacing(InnerPre);

export const Pre: FC<PropsWithChildren<PreProps>> = ({ ...props }) => (
  <div className={styles.pre}>
    <MosaicPre {...props} />
  </div>
);
