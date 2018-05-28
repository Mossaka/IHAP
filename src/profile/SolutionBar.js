import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import firebase from 'firebase'

export default class SolutionBar extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: "Title",
      ticketID: 'ticketID',
    }
  }

  componentDidMount() {
    const solutionID = this.props.solutionID;
    const db = firebase.database();
    db.ref("solutions/" + solutionID + '/ticket/').once('value').then(snapshot => {
        const ticketID = snapshot.val();
        console.log(snapshot.val());
        db.ref('tickets/' + ticketID).once('value').then(snapshot => {
            this.setState(
            {   
                title: snapshot.child('title').val(), 
                ticketID: ticketID,
            });
        })
    })
  }

  render() {
    return(
        <div>
          <Navbar>
            <NavbarBrand href={"/ticket/" + this.state.ticketID}>{this.state.title}}</NavbarBrand>
            <Nav>
              <NavItem navbar>
                <NavLink href={"/ticket" + this.state.ticketID}>edit</NavLink>
              </NavItem>
            </Nav>
          </Navbar>
        </div>
    )
  }
}