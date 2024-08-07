import { RadioButton, RadioButtonGroup } from "@salt-ds/core";
import type { ReactElement } from "react";

export const Wrap = (): ReactElement => (
  <div
    style={{
      width: 250,
    }}
  >
    <RadioButtonGroup name="region" direction="horizontal" wrap>
      <RadioButton label="North America" value="namr" />
      <RadioButton label="Asia, Pacific" value="apac" />
      <RadioButton disabled label="Europe, Middle East, Africa" value="emea" />
    </RadioButtonGroup>
  </div>
);
