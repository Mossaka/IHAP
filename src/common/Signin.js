/*
 * This component defines the sign in form.
 */
import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import firebase from 'firebase';
import "./Signin.css"

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

  handleSubmit = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(e => {
        this.setState({ error: e.message });
      });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="signIn">
        <FormGroup>
          <Label>Email Addess</Label>
          <Input type="email" onChange={this.handleChange} value={this.state.email} />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input type="password" onChange={this.handleChange} value={this.state.password} />
        </FormGroup>
        {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
        <Button className="signInButton" color="steelblue">
          <span>Sign In</span>
        </Button>
      </Form>
    );
  }
}
