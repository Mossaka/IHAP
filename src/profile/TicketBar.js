import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import firebase from 'firebase'

export default class TicketBar extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: "Title"
    }
  }

  componentDidMount() {
      const ticketID = this.props.ticketID;
      firebase.database().ref('tickets/' + ticketID).once('value').then(snapshot => {
        this.setState({title: snapshot.child('title').val()})
      });
  }

  render() {
    return(
        <div>
          <Navbar>
            <NavbarBrand href={"/ticket/" + this.props.ticketID}>{this.state.title}</NavbarBrand>
            <Nav>
              <NavItem>
                <NavLink href={"/ticket" + this.props.ticketID}>edit</NavLink>
              </NavItem>
            </Nav>
          </Navbar>
        </div>
    )
  }
}