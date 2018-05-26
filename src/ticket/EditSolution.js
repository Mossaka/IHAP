import React from 'react';
import { Button, Form, Alert } from 'reactstrap';
import firebase from 'firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { EDITOR_TOOLBAR } from './config';

export default class EditSolution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      content: '',
      error: '',
      edit: false
    };

    firebase.auth().onAuthStateChanged(u => {
      if (u)
        this.setState({ loggedIn: true });
      else
        this.setState({ loggedIn: false });
    });
  }

  flip = () => {
    this.setState({ edit: !this.state.edit });
  }

  handleChange = (c) => {
    this.setState({ content: c });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.content) {
      this.setState({ error: 'Content can not be empty' });
      return;
    }

    let db = firebase.database();
    let uid = firebase.auth().currentUser.uid;
    let key = db.ref('solutions').push({
      content: this.state.content,
      creator: uid,
      dateEdited: new Date().getTime(),
      upvote: 0,
      downvote: 0
    }).key;
    db.ref('tickets/' + this.props.ticket + '/solutions').push(key);
    db.ref('profiles/' + uid + '/solutions').push(key);
    window.location.reload();
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <Button>Sign In to Post</Button>
      );
    }

    if (this.state.edit) {
      return (
        <div>
          <ReactQuill value={this.state.content} modules={EDITOR_TOOLBAR} onChange={this.handleChange} />
          {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
          <Button onClick={this.handleSubmit}>Submit</Button>
          <Button onClick={this.flip}>Cancel</Button>
        </div>
      );
    }

    return (
      <Button onClick={this.flip}>Write New Solution</Button>
    );
  }
}