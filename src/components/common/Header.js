import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import lever from '../../assets/lever.png';
import '../../styles/Header.css';
import { Button } from 'reactstrap';


const Header = ({ loading }) => {

  return (
    <nav id='nav'>
      <div className="logo">
        <Link to="/"><img src={logo} className="image" alt="IHAP Logo" /></Link>
      </div>

      <div className="center">
        <div>
          <img src={lever} className="image" alt="Lever" />
          <img src={lever} className="upsidedownImage" alt="Lever" />
        </div>
        <div>
          <p>Random</p>
          <p>Search</p>
        </div>
      </div>

      <div className="user">
        <Link to="/signin"><Button className="button" color="primary" size="sm">Log in</Button></Link>
        <br />
        <Link to="/signup"><Button className="button" color="primary" size="sm">Sign up</Button></Link>
      </div>
    </nav>
  );
};

export default Header;
