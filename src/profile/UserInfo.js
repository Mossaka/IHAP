import React from 'react';
import { Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import * as FontAwesome from 'react-icons/lib/fa';
import PropTypes from 'prop-types';
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
      title: "Loading",
      isUserNameDropDownOpen: false,
      isBioDropDownOpen: false,
    }

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleUserName = this.toggleUserName.bind(this);
    
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      avatar: anonymousAvatar,
    })
    if(this.props.profileUserID)
      firebase.database().ref('profiles/' + this.props.profileUserID).once('value').then(snapshot => {
        this.setState({ ...snapshot.val() })
      });
  } 

  toggleDropdown() {
    this.setState({
      isUserNameDropDownOpen: !this.state.isUserNameDropDownOpen
    });
  }

  toggleUserName(){
    this.setState({
      isBioDropDownOpen: !this.state.isBioDropDownOpen
    })
  }

  render() {
    return (
    <div className='user-info'>
      <Row xs="8">
        <Col xs='3'>
          <div id="user">
            <div id="avatar">
              <img src={this.state.avatar} alt='avatar' />
            </div>
            <div className='row'>
              <a className="username" id="Popover" onClick={this.toggleUserName} style={{ fontSize: '25px', float: 'left' }}>{this.state.username.substring(0, 12)}</a>
              <Popover placement='bottom' isOpen={this.state.isUserNameDropDownOpen} target='Popover' toggle={this.toggleUserName}>
                <PopoverBody>{this.state.username}</PopoverBody>
              </Popover>
            </div>
            <div className='row'>
              <a className="realname pl-1" style={{ fontSize: '20px', float: 'left' }}>{this.state.firstname.substr(0, 8) + " " + this.state.lastname.substr(0, 8)}</a>
            </div>
          </div>
        </Col>
        <Col xs='auto'>
          <div className="info float-left">
            <Nav>
              <Row>
                <NavItem>
                  <NavLink>
                    <FontAwesome.FaEnvelope width='25px' height='25px' />  {this.state.email}</NavLink>
                </NavItem>
                <NavLink id='Popover1' onClick={this.toggleDropdown}>
                  <FontAwesome.FaUser width='25px' height='25px' />  <a>Bio</a>
                </NavLink>
                <Popover placement='bottom' isOpen={this.state.isBioDropDownOpen} target='Popover1' toggle={this.toggleDropdown}>
                  <PopoverHeader>Biography</PopoverHeader>
                  <PopoverBody>{this.state.biography}</PopoverBody>
                </Popover>
                <NavItem>
                  <NavLink> <FontAwesome.FaBriefcase width='25px' height='25px' />  {this.state.title ? this.state.title.substring(0, 10) : 'Awesome Human'}</NavLink>
                </NavItem>
              </Row>
            </Nav>
          </div>
        </Col>
        <Col>
          <div id="follow" className='float-right' style={{ bottom: '0', float: 'right' }}>
            {this.props.toggleButton()}
          </div>
        </Col>
      </Row>
    </div>);
  }
}

UserInfo.PropTypes = {
  profileUserID: PropTypes.string,
  toggleButton: PropTypes.func,

}