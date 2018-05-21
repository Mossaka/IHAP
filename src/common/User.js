import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import './User.css';
import Signup from './Signup';
import Signin from './Signin';
import firebase from 'firebase';
import avatar from '../assets/img_avatar.png';

const STR = {
  in: 'Sign In',
  up: 'Sign Up'
}

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      mode: null,
      dropdown: false
    };

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          mode: null,
          loggedIn: true
        });
      } else {
        this.setState({
          loggedIn: false
        });
      }
    });
  }

  handleLogout = () => {
    firebase.auth().signOut()
      .catch(e => {
        console.log(e)
      });
  }

  closeModal = () => {
    this.setState({ mode: null });
  }

  toggleDropdown = () => {
    this.setState({ dropdown: !this.state.dropdown });
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div className="user">
          <img src={avatar} />
          <Dropdown isOpen={this.state.dropdown} toggle={this.toggleDropdown}>
            <DropdownToggle>Username</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem onClick={this.handleLogout}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    }
    else {
      return (
        <div className="user">
          <Button size="sm" onClick={() => this.setState({ mode: 'in' })}>Sign in</Button>
          <Button size="sm" onClick={() => this.setState({ mode: 'up' })}>Sign up</Button>
          <Modal isOpen={this.state.mode} toggle={this.closeModal}>
            <ModalHeader toggle={this.closeModal}>{STR[this.state.mode]}</ModalHeader>
            <ModalBody>
              {this.state.mode === 'in' && <Signin />}
              {this.state.mode === 'up' && <Signup />}
            </ModalBody>
          </Modal>
        </div>
      );
    }
  }
}