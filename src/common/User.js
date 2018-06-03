import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, DropdownToggle, DropdownItem, DropdownMenu, InputGroup, InputGroupAddon, ButtonDropdown } from 'reactstrap';
import './User.css';
import Signup from './Signup';
import Signin from './Signin';
import firebase from 'firebase';
import defaultAvatar from '../assets/anonymous-avatar.jpg';
import { Link } from 'react-router-dom';

const STR = {
  in: 'Sign In',
  up: 'Sign Up',
  name: ''
}

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      mode: null,
      dropdown: false,
      uid: '',
      defaultAvatar
    };
    this.unsub = [];
  }

  componentDidMount() {
    let un = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let ref = firebase.database().ref('profiles/' + user.uid);
        let cb = ref.on('value', snapshot => {
          snapshot = snapshot.val();
          let avatar = snapshot.avatar ? snapshot.avatar : defaultAvatar;
          this.setState({
            name: snapshot.username,
            uid: user.uid,
            avatar
          });
        });
        this.unsub.push(() => ref.off(cb));
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
    this.unsub.push(un);
  }

  componentWillUnmount() {
    for (let fn of this.unsub) {
      fn();
    }
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
          <Link to={'/profile/' + this.state.uid}><img src={this.state.avatar} alt="avatar" /></Link>
          <ButtonDropdown isOpen={this.state.dropdown} toggle={this.toggleDropdown}>
            <Button className="userbutton" id="caret">
              <Link to={'/profile/' + this.state.uid}>
                {this.state.name ? this.state.name.substring(0,15) : this.state.name}
              </Link>
            </Button>
            <DropdownToggle className="userbutton" caret />
            <DropdownMenu>
              <DropdownItem onClick={this.handleLogout}>Log Out</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div >
      );
    }

    return (
      <div className="user">
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <Button className="buttons" color="#FFCD00" onClick={() => this.setState({ mode: 'in' })}>
              <span>Sign In</span>
            </Button>
          </InputGroupAddon>
          <InputGroupAddon addonType="append">
            <Button className="buttons" color="#FFCD00" onClick={() => this.setState({ mode: 'up' })}>
              <span>Sign Up</span>
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <Modal isOpen={this.state.mode !== null} toggle={this.closeModal}>
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