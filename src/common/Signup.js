import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import firebase from 'firebase';

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  password2: '',
  error: null,
  modal: true,
};


export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };

        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(e) {
        const target = e.target;
        if( target.type === 'text' ) {
          this.setState({'username': target.value})
        } else {
          this.setState({
            [target.type]: target.value
          });
        }
      }

      handleSubmit(e) {
        e.preventDefault();
        alert(this.state.username + this.state.email + this.state.password)
        const {
          username,
          email,
          password
        } = this.state;
        firebase.auth().doCreateUserWithEmailAndPassword(email, password)
        .then(authUser => {
          // this.setState(()=> ({ ...INITIAL_STATE }))
          firebase.database().doCreateUser(authUser.uid, username, email)
            .then( () => {
              this.setState( () => ({...INITIAL_STATE}));
            }).catch(error => {alert(error)})
        }).catch(error => {console.log(error)})
        this.toggle();

      }

      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

      render() {
        return (
          <div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}></ModalHeader>
              <ModalBody>
                <Form onSubmit={this.handleSubmit}>
                <h2 className="text-center"> Sign Up </h2>
                <FormGroup>
                  <Label for="username">User Name</Label>
                  <Input type="username"
                          id="SignupUsername"
                          placeholder="Username"
                          onChange={this.handleChange}
                          />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email Addess</Label>
                  <Input type="email" id="SignupEmail" placeholder="Email Addess"
                          onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input type="password" id="SignupPassword" placeholder="Password"
                          onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Confirm Password</Label>
                  <Input type="password" id="SignupConfirmPassword" placeholder="Confirm Password"
                          onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                  <Button color="primary" size="lg" block type="submit">Sign Up</Button>
                </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
          </div>
        );
    }
}
