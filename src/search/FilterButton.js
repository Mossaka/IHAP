/*
 * This component defines the filter button.
 */
import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './SearchPreview.css';

export default class FilterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dropdownOpen: false };
  }

  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  render() {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Filter by
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem className="filterItem">relevant</DropdownItem>
          <DropdownItem divider />
          <DropdownItem className="filterItem">time</DropdownItem>
          <DropdownItem divider />
          <DropdownItem className="filterItem">votes</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}
