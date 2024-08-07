import { ParentChildLayout } from "@salt-ds/core";
import type { ReactElement } from "react";

import styles from "./Default.module.css";

const parent = <div className={styles.parentContent}>Parent</div>;

const child = <div className={styles.childContent}>Child</div>;

export const Default = (): ReactElement => (
  <ParentChildLayout
    parent={parent}
    child={child}
    className={styles["parent-child-layout"]}
  />
);
