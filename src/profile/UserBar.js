import React from 'react';
import avatar from '../assets/img_avatar.png';
import { Link } from 'react-router-dom';
import Avatar from '../common/Avatar'
import firebase from 'firebase'
import './UserBar.css'
import { Redirect } from 'react-router-dom';
import UnfollowButton from './UnfollowButton'

// import {MdCancel, MdChat, MdCheck} from 'react-icons/md';

export default class TicketBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: avatar,
      username: "Username",
      // redirect: false,
    }

    // this.changeRoute = this.changeRoute.bind(this);
  }

  componentDidMount() {
    const uid = this.props.uid;
    firebase.database().ref('profiles/' + uid).once('value').then(snapshot => {
      this.setState({...snapshot.val()})
    });
  }
  
  // changeRoute(e) {
  //   e.preventDefault();
  //   this.setState({redirect: true,})
  // }

  render() {
    // if(this.state.redirect)
    //     return <Redirect push to={"/profile/" + this.props.uid }/>;
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

        <Link className="clickable-card " to={'/profile/' + this.props.uid} style={{ textDecoration: 'none' }} >
        <div className='user-preview'>
          <div className='row'>
          <div className='col-6'>
            <Avatar id={this.props.uid} isAnonymous={false} />
          </div>
          <div className='col-6'>
              <UnfollowButton handleUnfollow = {(e) => this.props.handleUnfollow(e, this.props.uid)} />
          </div>
          </div>
          
        </div>
        </Link>
    )
  }
}