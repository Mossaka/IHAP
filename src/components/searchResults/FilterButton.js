import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '../../styles/SearchPreview.css'

export default class FilterButton extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Filter by
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem >relevant</DropdownItem>
          <DropdownItem divider />
          <DropdownItem >time</DropdownItem>
          <DropdownItem divider />
          <DropdownItem >votes</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}