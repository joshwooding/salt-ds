import type { GetContextMenuItemsParams } from "ag-grid-community";
import { AgGridReact, type AgGridReactProps } from "ag-grid-react";
import dataGridExampleColumns from "../dependencies/dataGridExampleColumns";
import dataGridExampleData from "../dependencies/dataGridExampleData";
import mac from "../dependencies/mac.png";
import { useAgGridHelpers } from "../dependencies/useAgGridHelpers";
import windows from "../dependencies/windows.png";

const ContextMenu = (props: AgGridReactProps) => {
  const { agGridProps, containerProps } = useAgGridHelpers();

  const getContextMenuItems = (params: GetContextMenuItemsParams) => {
    const result = [
      {
        name: `Alert ${params.value}`,
        action() {
          window.alert(`Alerting about ${params.value}`);
        },
        cssClasses: ["redFont", "bold"],
      },
      {
        name: "Always Disabled",
        disabled: true,
        tooltip:
          "Very long tooltip, did I mention that I am very long, well I am! Long!  Very Long!",
      },
      {
        name: "Country",
        subMenu: [
          {
            name: "Ireland",
            action() {
              console.log("Ireland was pressed");
            },
          },
          {
            name: "UK",
            action() {
              console.log("UK was pressed");
            },
          },
          {
            name: "France",
            action() {
              console.log("France was pressed");
            },
          },
        ],
      },
      {
        name: "Person",
        subMenu: [
          {
            name: "Niall",
            action() {
              console.log("Niall was pressed");
            },
          },
          {
            name: "Sean",
            action() {
              console.log("Sean was pressed");
            },
          },
          {
            name: "John",
            action() {
              console.log("John was pressed");
            },
          },
          {
            name: "Alberto",
            action() {
              console.log("Alberto was pressed");
            },
          },
          {
            name: "Tony",
            action() {
              console.log("Tony was pressed");
            },
          },
          {
            name: "Andrew",
            action() {
              console.log("Andrew was pressed");
            },
          },
          {
            name: "Kev",
            action() {
              console.log("Kev was pressed");
            },
          },
          {
            name: "Will",
            action() {
              console.log("Will was pressed");
            },
          },
          {
            name: "Armaan",
            action() {
              console.log("Armaan was pressed");
            },
          },
        ],
      },
      "separator",
      {
        name: "Windows",
        shortcut: "Alt + W",
        action() {
          console.log("Windows Item Selected");
        },
        icon: `<img src='${windows}' alt="" />`,
      },
      {
        name: "Mac",
        shortcut: "Alt + M",
        action() {
          console.log("Mac Item Selected");
        },
        icon: `<img src='${mac}' alt="" />`,
      },
      "separator",
      {
        name: "Checked",
        checked: true,
        action() {
          console.log("Checked Selected");
        },
        icon: `<img src='${windows}' alt="" />`,
      },
      "copy",
    ];
    return result;
  };

  return (
    <div {...containerProps}>
      <AgGridReact
        {...agGridProps}
        {...props}
        allowContextMenuWithControlKey
        getContextMenuItems={getContextMenuItems}
        columnDefs={dataGridExampleColumns}
        rowSelection="multiple"
        rowData={dataGridExampleData}
      />
    </div>
  );
};

export default ContextMenu;
