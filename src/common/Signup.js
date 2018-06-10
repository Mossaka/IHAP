/*
 * This component defines the sign up form.
 */
import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import firebase from 'firebase';
import "./Signup.css"

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    // default value for user information
    this.state = {
      name: '',
      email: '',
      pass: '',
      pass2: '',
      error: null,
      match: null
    };
  }

  // boilerplate code to control form elements in React
  handleChange = (e) => {
    const target = e.target;
    this.setState({
      [target.name]: target.value
    });

    if (target.name === 'pass2') {
      if (target.value !== this.state.pass) {
        this.setState({ match: false });
      }
      else {
        this.setState({ match: true });
      }
    }
  }

  // handle form submission
  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.match) return;

    // create a new user in firebase auth
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass).then(res => {
      // create a new user profile in the database
      firebase.database().ref('profiles/' + res.user.uid)
        .set({
          email: this.state.email,
          username: this.state.name,
          username_lowercase: this.state.name.toLowerCase(),
          dateCreated: new Date().getTime()
        });
    }).catch(e => {
      // prompt the user for database errors
      this.setState({ error: e.message });
    });
  }

  // the sign up form
  // validation is done by built-in html validation
  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="signUp">
        <FormGroup>
          <Label>Username</Label>
          <Input type="text" name="name" onChange={this.handleChange} value={this.state.name} required maxlength="32" />
        </FormGroup>
        <FormGroup>
          <Label>Email Address</Label>
          <Input type="email" name="email" onChange={this.handleChange} value={this.state.email} required maxlength="64" />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input type="password" name="pass" onChange={this.handleChange} value={this.state.pass} required maxlength="32" />
        </FormGroup>
        <FormGroup>
          <Label>Confirm Password</Label>
          <Input type="password" name="pass2" onChange={this.handleChange} value={this.state.pass2} required />
        </FormGroup>
        {this.state.match === false && <Alert color="danger">Password doesn't match</Alert>}
        {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
        <Button className="signUpButton" color="steelblue">
          <span>Sign Up</span>
        </Button>
      </Form>
    );
  }
}
