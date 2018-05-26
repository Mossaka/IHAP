import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Form, Input, FormGroup, Button, Label, Alert } from 'reactstrap';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';

class EditTicket extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    let modules = {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
      ],
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label>Title</Label>
          <Input type="text" name="title" value={this.state.title} onChange={this.handleChange} required maxlength="32" />
        </FormGroup>
        <FormGroup>
          <Label>Thumbnail URL</Label>
          {this.state.image && <img className="img-thumbnail d-block" src={this.state.image} alt="thumbnail" />}
          <Input type="text" name="image" value={this.state.image} onChange={this.handleChange} required />
        </FormGroup>
        <ReactQuill value={this.state.content} modules={modules} onChange={this.handleChange} />
        <FormGroup check>
          <Label check>
            <Input type="checkbox" name="anonymous" onChange={this.handleChange} checked={this.state.anonymous} /> Anonymous
          </Label>
        </FormGroup>
        {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
        <Button className="mt-3">Submit</Button>
      </Form>
    );
  }
}

export default withRouter(EditTicket);