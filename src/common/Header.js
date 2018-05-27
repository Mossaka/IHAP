import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from '../assets/logo.png';
import lever from '../assets/lever.png';
import User from './User';
import './Header.css';
import firebase from 'firebase';
import { Button, Col, Input } from 'reactstrap';


class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      random: false,
      rotation: 0,
      keyword: ' ',
      loggedIn: false,
      showSignup: false, 
      ticketIDs: [],
      ticketDisplayed: '',
      numTickets: 0
    }
    this.handleLeverClick = this.handleLeverClick.bind(this);
    this.setRandom = this.setRandom.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.search = this.search.bind(this);
    this.loadRandomTicket = this.loadRandomTicket.bind(this);

    // Save load ticket keys from database. 
    var tickets = firebase.database().ref('tickets'); 
    tickets.once('value').then((snapshot) => {
      var numTickets = snapshot.numChildren();
      var ticketKeys = []; 
      snapshot.forEach(((snapshot) => {
        var key = snapshot.key;
        ticketKeys.push(key);
      }));
      this.setState (
        {
          ticketIDs: ticketKeys, 
          numTickets: numTickets
        }
      )
    });
  }

  search() {
    this.props.history.push('/search/' + this.state.keyword);
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

  loadRandomTicket() {
    var ticketKey = this.state.ticketIDs[Math.floor(Math.random() * this.state.numTickets)];
    if(ticketKey !== this.state.ticketDisplayed) {
      console.log(ticketKey);
      this.props.history.push('/ticket/' + ticketKey);
      this.setState (
        {
          ticketDisplayed: ticketKey
        }
      )
    }    
  }


  render() {
    const searchOrButton = this.state.random ? (
      <div className="searchOrRandom">
        <Button className="searchOrRandomItem" color="secondary" onClick={this.loadRandomTicket} block >GET RANDOM TICKET</Button>
      </div>
    ) : (
      <div className="searchOrRandom">
        <Input className="searchOrRandomItem" type="search" name="search" placeholder="Search" onKeyUp={this.handleKeyPress}/>
        <Button color="secondary" onClick={this.search}>Search</Button>
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
