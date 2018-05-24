import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from '../assets/logo.png';
import lever from '../assets/lever.png';
import * as global from '../global.js';
import User from './User';
import './Header.css';
import { Button, Col, Input, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      random: false,
      rotation: 0,
      searchDropdownOpen: false,
      searching: 'Tickets',
      keyword: ' ',
      loggedIn: false,
      showSignup: false
    }
    this.handleLeverClick = this.handleLeverClick.bind(this);
    this.setRandom = this.setRandom.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.searchTickets = this.searchTickets.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.search = this.search.bind(this);
  }

  search() {
    this.props.history.push('/search/' + (this.state.searching === 'Tickets' ? global.TICKETS : global.USERS) + '/' + this.state.keyword);
  }


  handleKeyPress(e) {
    this.setState (
      {
        keyword: e.target.value,
      }
    );
    if(e.key === 'Enter') {
      this.search();
    }
  }

  
  handleLeverClick() {
    if (this.state.random === true) {
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
    this.setState(
      {
        searchDropdownOpen: !this.state.searchDropdownOpen
      }
    );
  }

  searchTickets() {
    this.setState (
      {
        searching: "Tickets"
      }
    );
    this.search();

  }

  searchUsers() {
    this.setState (
      {
        searching: "Users"
      }
    );
    this.search();
  }


  render() {
    const searchOrButton = this.state.random ? (
      <div className="searchOrRandom">
        <Button className="searchOrRandomItem" color="secondary" block ><Link className="randomButton" to={"/ticket/" + Math.ceil(Math.random() * 1)}>GET RANDOM TICKET</Link></Button>
      </div>
    ) : (
      <div className="searchOrRandom">
        <Input className="searchOrRandomItem"  type="search" name="search" placeholder="Search" onKeyUp={this.handleKeyPress}/>
        <ButtonDropdown className="searchOrRandomItem" isOpen={this.state.searchDropdownOpen} toggle={this.toggleSearch}>
        <Button color="secondary" onClick={this.search}>Search {this.state.searching}</Button>
        <DropdownToggle caret color="secondary" />
        <DropdownMenu>
          <DropdownItem onClick={this.searchTickets}>Search Tickets</DropdownItem>
          <DropdownItem onClick={this.searchUsers}>Search Users</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
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

        <Col xs="3">
          <User />
        </Col>
      </nav>
    );
  }
}
export default withRouter(Header);
