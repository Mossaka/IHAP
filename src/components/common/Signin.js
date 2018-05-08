import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  modal: true,
};

export default class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
      }
      handleChange(e) {
        this.setState({
          [e.target.type] : e.target.value,
        })
      }

      handleSubmit(e) {
        // check validaty of name and password.
        e.preventDefault();
        const {
          email,
          password,
        } = this.state;
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
              <h2 className="text-center"> Sign In</h2>
                <FormGroup>
                  <Label for="email">Email Addess</Label>
                  <Input type="email" id="SigninEmail" placeholder="Email Addess" 
                         onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input type="password" id="SigninPassword" placeholder="Password" 
                         onChange = {this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Button color="primary" size="lg" block>Sign In</Button>
                </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
          </div>
        );
    }
}