import React, {ChangeEventHandler, Component, useState} from 'react';
import PropTypes from 'prop-types';
import {AgGridReactProps} from "ag-grid-react";

/**
 * The purpose of this example is to demonstrate how we can override the GUI and functionality
 * for floating filters.
 */
const DataGridExampleFloatingFilterExample = function DataGridExampleFloatingFilterExample(props: AgGridReactProps) {
  const [currentValue, setCurrentValue] = useState<string>();

  const valueChanged: ChangeEventHandler<HTMLInputElement> = event => {
    setCurrentValue(event.target.value),
      () => {
        this.props.onFloatingFilterChanged({ model: this.buildModel() });
      }
    );
  };

  onParentModelChanged(parentModel) {
    this.setState({
      currentValue: !parentModel ? '' : parentModel.filter
    });
  }

  buildModel() {
    return {
      filterType: 'text',
      type: 'contains',
      filter: this.state.currentValue,
      filterTo: null
    };
  }

  render() {
    return (
      <input onChange={this.valueChanged} placeholder="Search" type="text" />
    );
  }
}

DataGridExampleFloatingFilterExample.propTypes = {
  /**
   * @external
   */
  onFloatingFilterChanged: PropTypes.func
};

export default function DataGridExampleFloatingFilter(props) {
  return <DataGridExampleFloatingFilterExample {...props} />;
}
