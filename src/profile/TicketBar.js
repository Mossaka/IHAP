import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class TicketBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <div>
          <Navbar>
            <NavbarBrand href="/tickets">Title</NavbarBrand>
            <Nav>
              <NavItem navbar>
                <NavLink href="/tickets">edit</NavLink>
              </NavItem>
            </Nav>
          </Navbar>
        </div>
    )
  }
}