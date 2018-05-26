import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Form, Input, FormGroup, Button, Label, Alert } from 'reactstrap';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import { EDITOR_TOOLBAR } from './config';

class EditTicket extends React.Component {
  constructor(props) {
    super(props);
    if (props.preload)
      this.state = {
        ...props.preload,
        error: ''
      }
    else
      this.state = {
        title: '',
        image: '',
        content: '',
        anonymous: false,
        error: ''
      };
  }

  handleChange = (e) => {
    if (!e.target) {
      this.setState({ content: e });
      return;
    }

    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.content) {
      this.setState({ error: 'Content can not be empty' });
      return;
    }

    let db = firebase.database();
    if (this.props.id) {
      db.ref('tickets/' + this.props.id)
        .update({
          anonymous: this.state.anonymous,
          content: this.state.content,
          dateEdited: new Date().getTime(),
          image: this.state.image,
          title: this.state.title,
        });
      window.location.reload();
    }
    else {
      let key = db.ref('tickets')
        .push({
          anonymous: this.state.anonymous,
          content: this.state.content,
          creator: firebase.auth().currentUser.uid,
          dateEdited: new Date().getTime(),
          image: this.state.image,
          title: this.state.title,
          upvote: 0,
          downvote: 0
        }).key;

      db.ref('profiles/' + firebase.auth().currentUser.uid + '/tickets').push(key);
      this.props.history.push('/ticket/' + key);
    }

  }

  render() {
    return (
      <div>
        <FormGroup>
          <Label>Title</Label>
          <Input type="text" name="title" value={this.state.title} onChange={this.handleChange} required maxLength="64" />
        </FormGroup>
        <FormGroup>
          <Label>Thumbnail URL</Label>
          {this.state.image && <img className="img-thumbnail d-block" src={this.state.image} alt="thumbnail" />}
          <Input type="text" name="image" value={this.state.image} onChange={this.handleChange} required />
        </FormGroup>
        <ReactQuill value={this.state.content} modules={EDITOR_TOOLBAR} onChange={this.handleChange} />
        <FormGroup check>
          <Label check>
            <Input type="checkbox" name="anonymous" onChange={this.handleChange} checked={this.state.anonymous} /> Anonymous
          </Label>
        </FormGroup>
        {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
        <Button className="mt-3" onClick={this.handleSubmit}>Submit</Button>
        {this.props.cancel && <Button onClick={this.props.cancel}>Cancel</Button>}
      </div>
    );
  }
}

export default withRouter(EditTicket);