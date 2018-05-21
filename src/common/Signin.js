import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import firebase from 'firebase';

export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.type]: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        this.setState({ error: e });
      });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label>Email Addess</Label>
          <Input type="email" onChange={this.handleChange} value={this.state.email} />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input type="password" onChange={this.handleChange} value={this.state.password} />
        </FormGroup>
        {this.state.error && <Alert color="danger">{this.state.error.message}</Alert>}
        <Button color="primary">Sign In</Button>
      </Form>
    );
  }
}