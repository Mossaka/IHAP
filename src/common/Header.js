/*
 * This component defined the header of the website.
 */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from '../assets/logo.png';
import lever from '../assets/lever.png';
import User from './User';
import './Header.css';
import { Button, Input } from 'reactstrap';
import { MdSearch } from 'react-icons/lib/md';
import { getTickets } from '../utils/store';
import GetRandomTicketButton from '../common/GetRandomTicketButton';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      random: false,
      keyword: ' ',
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
    this.setState({ keyword: e.target.value === '' ? ' ' : e.target.value });
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
          <GetRandomTicketButton buttonText="GET RANDOM TICKET" />
        </div>
      );
    }
    else {
      searchOrButton = (
        <div className="searchOrRandom">
          <Input placeholder="What's bothering you?" onKeyUp={this.handleKeyPress} />
          <Button className="searchButton" onClick={this.search}><MdSearch width="25px" height="25px" />Search | Post</Button>
        </div>
      );
    }

    return (
      <nav className="navbar">
        <div className='container'>
          <div className='col-lg-2 col-md-3'>
            <Link to="/" className="logo"><img src={logo} alt="IHAP Logo" /><h3>I.H.A.P.</h3></Link>
          </div>
          <div className='col-lg-7 col-md-6'>
            <div className="center">
              {searchOrButton}
              <div className="lever" onClick={this.toggleRandom}>
                <img src={lever} alt="Lever" className={'clickable ' + this.state.random} />
                <div className="label">
                  <div onClick={this.setRandom}>Random</div>
                  <div onClick={this.setSearch}>Search</div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-3 col-md-3 float-right'>
            <User />
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);
