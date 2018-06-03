import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from '../assets/logo.png';
import lever from '../assets/lever.png';
import User from './User';
import './Header.css';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { MdSearch } from 'react-icons/lib/md';
import { getTickets } from '../utils/store';
import GetRandomTicketButton from '../common/GetRandomTicketButton';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      random: false,
      keyword: '',
    };
  }

  componentDidMount() {
    getTickets(tickets => {
      let ids = [];
      let count = 0;
      for (let t in tickets) {
        ids.push(t);
        count++;
      }
      this.ticketIDs = ids;
      this.numTickets = count;
    });
  }

  search = () => {
    this.props.history.push('/search/' + this.state.keyword);
  }

  handleKeyPress = e => {
    this.setState({ keyword: e.target.value });
    if (e.key === 'Enter') {
      this.search();
    }
  }

  setRandom = () => {
    this.setState({ random: true });
  }

  setSearch = () => {
    this.setState({ random: false });
  }

  toggleRandom = () => {
    this.setState({ random: !this.state.random });
  }

  loadRandomTicket = () => {
    if (!this.ticketIDs) return;

    let ticketKey = this.ticketIDs[Math.floor(Math.random() * this.numTickets)];
    if (ticketKey !== this.ticketDisplayed) {
      this.ticketDisplayed = ticketKey;
      this.props.history.push('/ticket/' + ticketKey);
    }
  }

  render() {
    let searchOrButton = null;
    if (this.state.random) {
      searchOrButton = (
        <div className="searchOrRandom">
          <GetRandomTicketButton buttonText="GET RAND"/>
        </div>
      );
    }
    else {
      searchOrButton = (
        <InputGroup className="searchOrRandom">
          <Input placeholder="Search" onKeyUp={this.handleKeyPress} />
          <InputGroupAddon addonType="append">
            <Button className="searchButton" onClick={this.search}><MdSearch width="25px" height="25px" />Search</Button>
          </InputGroupAddon>
        </InputGroup>
      );
    }

    return (
      <nav className="navbar">
        <Link to="/"><img src={logo} alt="IHAP Logo" /></Link>
        <div className="center">
          {searchOrButton}
          <div className="lever">
            <img src={lever} alt="Lever" className={'clickable ' + this.state.random} onClick={this.toggleRandom} />
            <div className="label">
              <div onClick={this.setRandom}>Random</div>
              <div onClick={this.setSearch}>Search</div>
            </div>
          </div>
        </div>
        <User />
      </nav>
    );
  }
}

export default withRouter(Header);
