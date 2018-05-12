import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import logo from '../../assets/logo.png';
import lever from '../../assets/lever.png';
import '../../styles/Header.css';
import { Button } from 'reactstrap';


const Header = ({loading}) => {

  return (
    <nav>
      <span className="left logo">
      <IndexLink to="/" activeClassName="active"><img src={logo} className="image" alt="IHAP Logo" /></IndexLink>
      </span>

      <span className="center"> 
      <Link to="/tickets" activeClassName="active">Tickets</Link>
      {" | "}
      <Link to="/profile" activeClassName="active">Profile</Link>
        <span>
        <img src={lever} className="image" alt="Lever" />
        <img src={lever} className="upsidedownImage" alt="Lever" />
        </span>
        <span id="lever-options">
          Random
          Search
        </span>
      </span>
      
      <span className="right user">
        <Link to="/signin" activeClassName="active"><Button className="button" color="primary" size="sm">Log in</Button></Link>
        <br/ >
        <Link to="/signup" activeClassName="active"><Button className="button" color="primary" size="sm">Sign up</Button></Link>
      </span>
    </nav>
  );
};

export default Header;
