import React from 'react';
import { Button, Alert } from 'reactstrap';
import firebase from 'firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../common/StyleButton.css';

export default class EditSolution extends React.Component {
  constructor(props) {
    super(props);
    if (props.preload)
      this.state = {
        ...props.preload,
        error: ''
      }
    else
      this.state = {
        content: '',
        error: '',
      };
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
    if (this.props.preload) {
      db.ref('solutions/' + this.props.id).update({
        content: this.state.content
      });
    }
    else {
      let uid = firebase.auth().currentUser.uid;
      let key = db.ref('solutions').push({
        content: this.state.content,
        creator: uid,
        dateEdited: new Date().getTime(),
        upvote: 0,
        downvote: 0,
        ticket: this.props.ticket
      }).key;
      db.ref('tickets/' + this.props.ticket + '/solutions').push(key);
      db.ref('profiles/' + uid + '/solutions').push(key);
    }
    window.location.reload();
  }

  render() {
    return (
      <div>
        <ReactQuill value={this.state.content} onChange={this.handleChange} />
        {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
        <div className='row'>
          <div className='col-2'>
            <div className='style-btn-secondary'><Button onClick={this.handleSubmit}>Submit</Button></div>
          </div>
          <div className='col-2'>
            <div className='style-btn-secondary'><Button onClick={this.props.cancel}>Cancel</Button></div>
          </div>
        </div>
      </div>
    );
  }
}
