import { ComponentMeta, Story } from "@storybook/react";
import { QAContainer } from "docs/components";

import { Panel, ToolkitProvider } from "@jpmorganchase/uitk-core";
import {
  Combobox as ComboBox,
  ComboboxProps,
  FormField,
} from "@jpmorganchase/uitk-lab";

import { usa_states } from "./list.data";

export default {
  title: "Lab/Combobox/QA",
  component: ComboBox,
} as ComponentMeta<typeof ComboBox>;

const DensityValues = ["high", "medium", "low", "touch"] as const;
const DisplayRows = [5, 4, 3, 2] as const;

export const AllExamples: Story<ComboboxProps> = () => (
  <div>
    <ToolkitProvider theme="light">
      <Panel style={{ height: 250 }}>
        <div style={{ display: "flex", gap: 20 }}>
          {DensityValues.map((d, i) => (
            <ToolkitProvider key={`density-light-${d}`} density={d}>
              <div style={{ width: 180 }}>
                <FormField
                  helperText="This is some help text"
                  label="ADA compliant label"
                >
                  <ComboBox
                    ListProps={{
                      defaultSelected: usa_states[1],
                      displayedItemCount: DisplayRows[i],
                    }}
                    aria-label="Listbox example"
                    isOpen={true}
                    defaultValue="al"
                    source={usa_states}
                  />
                </FormField>
              </div>
            </ToolkitProvider>
          ))}
        </div>
      </Panel>
    </ToolkitProvider>
    <ToolkitProvider theme="dark">
      <Panel style={{ height: 250 }}>
        <div style={{ display: "flex", gap: 20 }}>
          {DensityValues.map((d, i) => (
            <ToolkitProvider key={`density-light-${d}`} density={d}>
              <div style={{ width: 180 }}>
                <FormField
                  helperText="This is some help text"
                  label="ADA compliant label"
                >
                  <ComboBox
                    ListProps={{
                      defaultSelected: usa_states[1],
                      displayedItemCount: DisplayRows[i],
                    }}
                    aria-label="Listbox example"
                    isOpen={true}
                    defaultValue="al"
                    source={usa_states}
                  />
                </FormField>
              </div>
            </ToolkitProvider>
          ))}
        </div>
      </Panel>
    </ToolkitProvider>
    <ToolkitProvider theme="light">
      <Panel style={{ height: "auto" }}>
        <div style={{ display: "flex", gap: 20 }}>
          {DensityValues.map((d, i) => (
            <ToolkitProvider key={`density-light-${d}`} density={d}>
              <div style={{ width: 180 }}>
                <ComboBox
                  ListProps={{
                    defaultSelected: usa_states[2],
                    displayedItemCount: DisplayRows[i],
                  }}
                  aria-label="Listbox example"
                  source={usa_states}
                />
              </div>
            </ToolkitProvider>
          ))}
        </div>
      </Panel>
    </ToolkitProvider>
    <ToolkitProvider theme="dark">
      <Panel style={{ height: "auto" }}>
        <div style={{ display: "flex", gap: 20 }}>
          {DensityValues.map((d, i) => (
            <ToolkitProvider key={`density-dark-${d}`} density={d}>
              <div style={{ width: 180 }}>
                <ComboBox
                  ListProps={{
                    defaultSelected: usa_states[2],
                    displayedItemCount: DisplayRows[i],
                  }}
                  aria-label="Listbox example"
                  source={usa_states}
                />
              </div>
            </ToolkitProvider>
          ))}
        </div>
      </Panel>
    </ToolkitProvider>
    <ToolkitProvider theme="light">
      <Panel style={{ height: "auto" }}>
        <div style={{ display: "flex", gap: 20 }}>
          {DensityValues.map((d, i) => (
            <ToolkitProvider key={`density-light-${d}`} density={d}>
              <div style={{ width: 180 }}>
                <FormField
                  helperText="This is some help text"
                  label="ADA compliant label"
                >
                  <ComboBox
                    ListProps={{
                      displayedItemCount: DisplayRows[i],
                    }}
                    aria-label="Listbox example"
                    source={usa_states}
                  />
                </FormField>
              </div>
            </ToolkitProvider>
          ))}
        </div>
      </Panel>
    </ToolkitProvider>
    <ToolkitProvider theme="dark">
      <Panel style={{ height: "auto" }}>
        <div style={{ display: "flex", gap: 20 }}>
          {DensityValues.map((d, i) => (
            <ToolkitProvider key={`density-dark-${d}`} density={d}>
              <div style={{ width: 180 }}>
                <FormField
                  helperText="This is some help text"
                  label="ADA compliant label"
                >
                  <ComboBox
                    ListProps={{
                      displayedItemCount: DisplayRows[i],
                    }}
                    aria-label="Listbox example"
                    source={usa_states}
                  />
                </FormField>
              </div>
            </ToolkitProvider>
          ))}
        </div>
      </Panel>
    </ToolkitProvider>
  </div>
);

AllExamples.parameters = {
  chromatic: { disableSnapshot: false },
};

export const CompareWithBaseline: Story<ComboboxProps> = (props) => {
  return (
    <QAContainer
      width={1272}
      height={1100}
      className="uitkFormFieldQA"
      imgSrc="/visual-regression-screenshots/Combobox-vr-snapshot.png"
    >
      <AllExamples />
    </QAContainer>
  );
};
