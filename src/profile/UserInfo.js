/*
 * This component displays user information on the profile page.
 */
import React from 'react';
import { Nav, NavItem, NavLink, Row } from 'reactstrap';
import { Popover, PopoverBody } from 'reactstrap';
import * as FontAwesome from 'react-icons/lib/fa';
import anonymousAvatar from '../assets/anonymous-avatar.jpg';
import firebase from 'firebase';
import './UserInfo.css'

export default class UserInfo extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      avatar: anonymousAvatar,
      biography: "Loading",
      email: 'Loading',
      firstname: "Loading",
      lastname: "",
      username: "Loading",
      isUserNameDropDownOpen: false,
      isBioDropDownOpen: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      avatar: anonymousAvatar,
    });
    if (this.props.profileUserID) {
      firebase.database().ref('profiles/' + this.props.profileUserID).once('value', snapshot => {
        this.setState({ ...snapshot.val() });
      });
    }
  }

  toggleDropdown = () => {
    this.setState({
      isBioDropDownOpen: !this.state.isBioDropDownOpen
    });
  }

  toggleUserName = () => {
    this.setState({
      isUserNameDropDownOpen: !this.state.isUserNameDropDownOpen
    });
  }

  render() {
    return (
      <div className="user-info">
        <Row>
          <div className="col-lg-3 col-md-5 col-sm-7">
            <div id="user">
              <div id="avatar">
                <img src={this.state.avatar} alt="avatar" />
              </div>
              <div className="row">
                <a className="username" id="Popover" onClick={this.toggleUserName} style={{ fontSize: '25px', float: 'left' }}>{this.state.username.substring(0, 12)}</a>
                <Popover placement="bottom" isOpen={this.state.isUserNameDropDownOpen} target="Popover" toggle={this.toggleUserName}>
                  <PopoverBody>{this.state.username}</PopoverBody>
                </Popover>
              </div>
              <div className="row">
                <div className="realname pl-1" style={{ fontSize: '20px', float: 'left' }}>{this.state.firstname.substr(0, 8) + " " + this.state.lastname.substr(0, 8)}</div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-4 col-sm-4">
            <div className="info float-left">
              <Nav>
                <Row>
                  <NavItem>
                    <NavLink>
                      <FontAwesome.FaEnvelope width="25px" height="25px" />  {this.state.email}</NavLink>
                  </NavItem>
                  <NavLink id="Popover1" onClick={this.toggleDropdown}>
                    <FontAwesome.FaUser width="25px" height="25px" />Biography
                </NavLink>
                  <Popover placement="bottom" isOpen={this.state.isBioDropDownOpen} target="Popover1" toggle={this.toggleDropdown}>
                    <PopoverBody>{this.state.biography}</PopoverBody>
                  </Popover>
                </Row>
              </Nav>
            </div>
          </div>
          <div className="col-lg-3 col-md-2 col-sm-1">
            <div id="follow" className='float-right' style={{ bottom: '0', float: 'right' }}>
              {this.props.toggleButton()}
            </div>
          </div>
        </Row>
      </div>);
  }
}
