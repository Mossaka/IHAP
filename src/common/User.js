import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './User.css';
import Signup from './Signup';
import Signin from './Signin';
import firebase from 'firebase';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      modal: false,
      mode: null
    };

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.closeModal();
        console.log(user)
      } else {

      }
    });
  }

  closeModal = () => {
    this.setState({ modal: false });
  }

  render() {
    let modal = (
      <Modal isOpen={this.state.modal} toggle={this.closeModal}>
        <ModalHeader toggle={this.closeModal} >Sign In/Up</ModalHeader>
        <ModalBody>
          {this.state.mode === 'in' ? <Signin /> : <Signup />}
        </ModalBody>
      </Modal>
    );

    if (this.state.loggedIn) {
      return (
        <div>
          {modal}
        </div>
      );
    }
    else {
      return (
        <div className="loggedInOrNotElements">
          <Button color="secondary" size="sm" onClick={() => this.setState({ modal: true, mode: 'in' })}>Sign in</Button>
          <Button color="secondary" size="sm" onClick={() => this.setState({ modal: true, mode: 'up' })}>Sign up</Button>
          {modal}
        </div>
      );
    }
  }
}