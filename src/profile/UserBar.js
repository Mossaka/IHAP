import React from 'react';
import avatar from '../assets/img_avatar.png';
import Avatar from '../common/Avatar'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import firebase from 'firebase'
import './UserBar.css'
import * as TI from 'react-icons/lib/ti'
import { Redirect } from 'react-router-dom';

// import {MdCancel, MdChat, MdCheck} from 'react-icons/md';

export default class TicketBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: avatar,
      username: "Username",
      redirect: false,
    }

    this.changeRoute = this.changeRoute.bind(this);
  }

  componentDidMount() {
    const uid = this.props.uid;
    firebase.database().ref('profiles/' + uid).once('value').then(snapshot => {
      this.setState({...snapshot.val()})
    });
  }
  
  changeRoute() {
    this.setState({redirect: true,})
  }

  render() {
    if(this.state.redirect)
        return <Redirect push to={"/profile/" + this.props.uid }/>;
    return(
        // <div>
        //   <Navbar>
        //     <NavbarBrand href={"/profile" + this.props.uid}>
        //     <Avatar id={this.props.uid} isAnonymous={false} />
        //     </NavbarBrand>
        //     <Nav>
        //       <NavItem navbar>
        //         <NavLink href={"/profile/" + this.props.uid}>view</NavLink>
        //       </NavItem>
        //     </Nav>
        //   </Navbar>
        // </div>

        <div className='user-preview' onClick={this.changeRoute}>
        {/* <Link className="clickable-card" to={'/ticket/' + this.state.ticketID}></Link> */}
          <div className='avatar'>
            <Avatar id={this.props.uid} isAnonymous={false} />
          </div>
          <div className = 'name'>
            {'Name: ' + this.state.firstname + " " + this.state.lastname}
          </div>
          <div className ="biography">
            {'Biography: '} {this.state.biography}
          </div>
          
        </div>
    )
  }
}