import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import lever from '../../assets/lever.png';
import '../../styles/Header.css';
import { Button, Col, Input } from 'reactstrap';


export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      random: false,
      rotation: 0,
      loggedIn: false
    }
    this.handleLeverClick = this.handleLeverClick.bind(this);
    this.setRandom = this.setRandom.bind(this);
    this.setSearch = this.setSearch.bind(this);
  }

  handleLeverClick() {
    if(this.state.random == true) {
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


  render() {
    const searchOrButton = this.state.random ? (
      <Button color="primary">GET RANDOM TICKET</Button>
    ) : (
      <div> 
        <Input type="search" name="search" placeholder="Search" />
        <Button color="primary">SEARCH</Button>
      </div>
    ); 
    return (
      <nav id='nav'>
        <Col className="logo" xs="3">
          <IndexLink to="/" activeClassName="active"><img src={logo} className="image" alt="IHAP Logo" /></IndexLink>
        </Col>
  
        <Col className="center" xs="auto">
          {searchOrButton}
          <div id="lever">
            <div>
              <img src={lever} alt="Lever" className="image clickable" style={{transform: `rotate(${this.state.rotation}deg)`}} onClick={this.handleLeverClick} />
            </div>
            <div>
              <div className="clickable" id="random" onClick={this.setRandom}>Random</div>
              <div className="clickable" id="search" onClick={this.setSearch}>Search</div>
            </div>
          </div>
        </Col>
  
        <Col className="user" xs="3">
          <Link to="/signin" activeClassName="active"><Button className="button" color="primary" size="sm">Log in</Button></Link>
          <br />
          <Link to="/signup" activeClassName="active"><Button className="button" color="primary" size="sm">Sign up</Button></Link>
        </Col>
      </nav>
    );
  }
  
}
