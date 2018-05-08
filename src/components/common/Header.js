import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';

const Header = ({loading}) => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="/tickets" activeClassName="active">Tickets</Link>
      {" | "}
      <Link to="/profile" activeClassName="active">Profile</Link>
      {" | "}
      <Link to="/signin" activeClassName="active">Signin</Link>
      {" | "}
      <Link to="/signup" activeClassName="active">Signup</Link>
      {" | "}
    </nav>
  );
};

export default Header;
