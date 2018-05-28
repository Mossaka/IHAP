import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import firebase from 'firebase'

export default class SolutionBar extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: "Title"
    }
  }

  componentDidMount() {
      const solutionID = this.props.solutionID;
      firebase.database().ref('solutions/' + solutionID).once('value').then(snapshot => {
        this.setState({title: snapshot.child('title').val()})
      });
  }

  render() {
    return(
        <div>
          <Navbar>
            <NavbarBrand href={"/ticket/" + this.props.solutionID}>{this.state.title}</NavbarBrand>
            <Nav>
              <NavItem navbar>
                <NavLink href={"/ticket" + this.props.ticketID}>edit</NavLink>
              </NavItem>
            </Nav>
          </Navbar>
        </div>
    )
  }
}