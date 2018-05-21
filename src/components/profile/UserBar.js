import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import avatar from '../../assets/img_avatar.png';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class TicketBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <div>
          <Navbar>
            <NavbarBrand href="/profile">
              <img className="avatar" src={avatar} style={{width: '35px'}} alt="Avatar" />
            </NavbarBrand>
            <Nav>
              <NavItem navbar>
                <NavLink href="/profile">view</NavLink>
              </NavItem>
            </Nav>
          </Navbar>
        </div>
    )
  }
}