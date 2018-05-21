import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import lever from '../assets/lever.png';
import avatar from '../assets/img_avatar.png';
import User from './User';

import './Header.css';

import { Button, Col, Input, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      random: false,
      rotation: 0,
      searchDropdownOpen: false,
      userDropdownOpen: false,
      loggedIn: false,
      showSignup: false
    }
    this.handleLeverClick = this.handleLeverClick.bind(this);
    this.setRandom = this.setRandom.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.toggleUserDropdown = this.toggleUserDropdown.bind(this);

  }

  handleLeverClick() {
    if (this.state.random == true) {
      this.setSearch();
    } else {
      this.setRandom();
    }
  }

  setRandom() {
    this.setState(
      {
        random: true,
        rotation: 180,
      }
    );
  }

  setSearch() {
    this.setState(
      {
        random: false,
        rotation: 0,
      }
    );
  }

  toggleSearch() {
    this.setState({
      searchDropdownOpen: !this.state.searchDropdownOpen
    });
  }

  toggleUserDropdown() {
    this.setState({
      userDropdownOpen: !this.state.userDropdownOpen
    });
  }


  render() {
    const searchOrButton = this.state.random ? (
      <div className="searchOrRandom">
        <Button className="searchOrRandomItem" color="secondary" block >GET RANDOM TICKET</Button>
      </div>
    ) : (
        <div className="searchOrRandom">
          <Input className="searchOrRandomItem" type="search" name="search" placeholder="Search" />
          <ButtonDropdown className="searchOrRandomItem" isOpen={this.state.searchDropdownOpen} toggle={this.toggleSearch}>
            <DropdownToggle caret color="secondary" >
              Search
        </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Search Tickets</DropdownItem>
              <DropdownItem>Search Users</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
      );

    const loggedInOrNot = this.state.loggedIn ? (
      <div className="loggedInOrNotElements">
        <img className="avatar" src={avatar} style={{ width: '35px' }} alt="Avatar" />
        <ButtonDropdown isOpen={this.state.userDropdownOpen} toggle={this.toggleUserDropdown}>
          <Button id="caret" color="secondary">username</Button>
          <DropdownToggle caret color="secondary" />
          <DropdownMenu>
            <DropdownItem >Settings</DropdownItem>
            <DropdownItem >Logout</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    ) : (
        <div className="loggedInOrNotElements">
          <Button className="button" color="secondary" size="sm">Sign in</Button>
          <Button className="button" color="secondary" size="sm" onClick={() => this.setState({ showSignup: true })}>Sign up</Button>
        </div>
      );

    return (
      <nav id='nav'>
        <Col className="logo" xs="3">
          <Link to="/"><img src={logo} className="image" alt="IHAP Logo" /></Link>
        </Col>

        <Col className="center" xs="6">
          {searchOrButton}
          <div id="lever">
            <div>
              <img src={lever} alt="Lever" className="image clickable" style={{ transform: `rotate(${this.state.rotation}deg)` }} onClick={this.handleLeverClick} />
            </div>
            <div>
              <div className="clickable" id="random" onClick={this.setRandom}>Random</div>
              <div className="clickable" id="search" onClick={this.setSearch}>Search</div>
            </div>
          </div>
        </Col>

        <Col className="user" xs="3">
          <User />
        </Col>
      </nav>
    );
  }
}
