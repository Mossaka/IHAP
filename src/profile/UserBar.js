import React from 'react';
import avatar from '../assets/img_avatar.png';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import firebase from 'firebase'
import './UserBar.css'

export default class TicketBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: avatar,
      username: "Username"
    }
  }

  componentDidMount() {
    const uid = this.props.uid;
    firebase.database().ref('profiles/' + uid).once('value').then(snapshot => {
      this.setState({...snapshot.val()})
    });
  }

  render() {
    return(
        <div>
          <Navbar>
            <NavbarBrand href={"/profile" + this.props.uid}>
              <div id="avatar" style={{backgroundImage: `URL(${this.state.avatar})`}}></div>
            </NavbarBrand>
            <Nav>
              <NavItem navbar>
                <NavLink href={"/profile/" + this.props.uid}>view</NavLink>
              </NavItem>
            </Nav>
          </Navbar>
        </div>
    )
  }
}