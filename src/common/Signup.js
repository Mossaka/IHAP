import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import firebase from 'firebase';
import "./Signup.css"

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      pass: '',
      pass2: '',
      error: null,
      match: null
    };
  }

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

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.match) return;

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass)
      .then(res => {
        firebase.database().ref('profiles/' + res.user.uid)
          .set({
            email: this.state.email,
            username: this.state.name,
            username_lowercase: this.state.name.toLowerCase(),
            dateCreated: new Date().getTime()
          });
      })
      .catch(e => {
        this.setState({ error: e.message });
      });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} >
        <FormGroup>
          <Label>User Name</Label>
          <Input type="text" name="name" onChange={this.handleChange} value={this.state.name} required  maxlength="32"/>
        </FormGroup>
        <FormGroup>
          <Label>Email Addess</Label>
          <Input type="email" name="email" onChange={this.handleChange} value={this.state.email} required />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input type="password" name="pass" onChange={this.handleChange} value={this.state.pass} required maxlength="32"/>
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
