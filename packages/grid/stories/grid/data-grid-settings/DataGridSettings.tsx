import { BehaviorSubject } from "rxjs";
import { createHook, createHandler, GridBackgroundVariant } from "../../../src";
import { Card, GridItem, GridLayout } from "@jpmorganchase/uitk-core";
import {
  ButtonBar,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupChangeEventHandler,
} from "../../../../lab";

export class EnumField<T> {
  public readonly label: string;
  public readonly value$: BehaviorSubject<T>;
  public readonly options$: BehaviorSubject<T[]>;
  public readonly useValue: () => T;
  public readonly useOptions: () => T[];
  public readonly setValue: (value: T) => void;

  constructor(label: string, options: T[], defaultValue: T) {
    this.label = label;
    this.options$ = new BehaviorSubject<T[]>(options);
    this.value$ = new BehaviorSubject<T>(defaultValue);
    this.useValue = createHook(this.value$);
    this.useOptions = createHook(this.options$);
    this.setValue = createHandler(this.value$);
  }
}

export class DataGridSettingsModel {
  public readonly backgroundVariant = new EnumField<GridBackgroundVariant>(
    "Background Variant",
    ["primary", "secondary", "zebra"],
    "primary"
  );

  constructor() {}
}

export interface ToggleButtonFieldProps<T> {
  model: EnumField<T>;
}

export const ToggleButtonField = function ToggleButtonField<T>(
  props: ToggleButtonFieldProps<T>
) {
  const { model } = props;
  const options = model.useOptions();
  const value = model.useValue();
  const selectedIndex = options.indexOf(value);

  const onChange: ToggleButtonGroupChangeEventHandler = (
    event,
    index,
    toggled
  ) => {
    model.setValue(options[index]);
  };

  return (
    <ToggleButtonGroup selectedIndex={selectedIndex} onChange={onChange}>
      {options.map((option, index) => {
        return <ToggleButton key={index}>{option}</ToggleButton>;
      })}
    </ToggleButtonGroup>
  );
};

export interface DataGridSettingsProps {
  model: DataGridSettingsModel;
}

export const DataGridSettings = function DataGridSettings(
  props: DataGridSettingsProps
) {
  const { model } = props;

  return (
    <Card>
      <GridLayout columns={4}>
        <GridItem colSpan={4}>
          <ToggleButtonField model={model.backgroundVariant} />
        </GridItem>
      </GridLayout>
    </Card>
  );
};
