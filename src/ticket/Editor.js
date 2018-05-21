import React from 'react';
import { Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '' }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(e)
  }

  handleImage = (e) => {
    console.log(e)
  }

  handleChange(value) {
    this.setState({ text: value })
  }

  render() {
    let modules = {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
      ],
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label>Title</Label>
          <Input type="text" name="title" />
        </FormGroup>
        <FormGroup>
          <Label>Thumbnail</Label>
          <CustomInput type="file" label="Yo, pick a file!" onChange={this.handleImage}/>
        </FormGroup>
        <ReactQuill value={this.state.text} modules={modules} onChange={this.handleChange} />
        <FormGroup>
          <CustomInput type="checkbox" id="checkInput" label="Anonymous" inline />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}
