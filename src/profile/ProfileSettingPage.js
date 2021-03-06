/*
 * This component defines the form for editing uer profile.
 */
import React from 'react';
import { Row, Button, Form, FormGroup, Label, CustomInput } from 'reactstrap';
import firebase from 'firebase';

class ProfileSettingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        firstname: '',
        lastname: '',
        username: '',
        username_lowercase: '',
        biography: '',
        avatar: null,
      },
      filetext: 'Please pick a picture for your avatar',
      fileState: 3,
      file: null,
    };
  }

  componentDidMount() {
    let db = firebase.database();
    db.ref('profiles/' + this.props.uid).once('value', snapshot => {
      this.setState({
        profile: {
          ...snapshot.val()
        }
      });
    });
  }

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (name === 'username') {
      this.setState({
        profile: {
          ...this.state.profile,
          [name]: value,
          username_lowercase: value.toLowerCase()
        }
      });
    }
    else {
      this.setState({
        profile: {
          ...this.state.profile,
          [name]: value
        }
      });
    }
  }

  handleSubmit = event => {
    firebase.database().ref('profiles/' + this.props.uid).update({
      ...this.state.profile
    });
    this.props.onSubmit();
    event.preventDefault();
    window.location.reload();
  }

  handleCancel = () => {
    this.props.onSubmit();
  }

  handleImage = event => {
    this.setState({ filetext: 'File start uploading', fileState: 2 });
    let file = event.target.files[0];
    let uploadTask = firebase.storage().ref().child('avatars/' + file.name).put(file);
    uploadTask.on('state_changed', snapshot => {
      // state change
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({ filetext: 'Upload is ' + progress + '% done' });
    }, error => {
      // error handling
      this.setState({ fileState: 2 });
    }, () => {
      // file upload succes
      uploadTask.snapshot.ref.getDownloadURL().then(url => {
        this.setState({
          profile: { ...this.state.profile, avatar: url },
          filetext: 'file uploading success!',
          fileState: 3
        });
      });
    });
  }
 
  render() {
    return (
      <div className="mt-5 mx-auto p-5" style={{ maxWidth: '2000px', border: '1px solid #A9A9A9' }}>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <FormGroup className="col-md-6">
              <Label for="firstname" className="col-form-label float-left">FIRST NAME</Label>
              <input type="firstname" name="firstname" value={this.state.profile.firstname} onChange={this.handleChange} className="form-control" id="InputFirstname" />
            </FormGroup>
            <div className="form-group col-md-6">
              <Label for="lastName" className="col-form-label float-left">LAST NAME</Label>
              <input type="lastName" name="lastname" value={this.state.profile.lastname} onChange={this.handleChange} className="form-control" id="InputLastName" />
            </div>
          </Row>
          <Row>
            <FormGroup className="col-md-6">
              <Label for="username" className="col-form-label float-left">USERNAME NAME</Label>
              <input type="username" name="username" value={this.state.profile.username} onChange={this.handleChange} className="form-control" id="InputUsername" />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className="form-group col-md-12">
              <Label for="biography" className="col-form-label float-left">BIOGRAPHY</Label>
              <textarea type="biography" name="biography" value={this.state.profile.biography} onChange={this.handleChange} className="form-control" id="InputBiography" rows="6"></textarea>
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className="col-md-12">
              <Label>AVATAR</Label>
              <CustomInput id="fileInput" type="file" label={this.state.filetext} onChange={this.handleImage} />
            </FormGroup>
          </Row>
          <Row>
            <div className="col-md-12">
              <div className="btn-group float-right">
                {
                  this.state.fileState === 3 ? <Button type="submit" value="Submit" className="btn btn-info" style={{ marginRight: "10px", borderRadius: "4px", width: "80px" }}>Save</Button>
                    : <Button disabled type="submit" value="Submit" className="btn btn-info" style={{ marginRight: "10px", borderRadius: "4px", width: "80px" }}>Save</Button>
                }
                <Button type="button" className="btn btn-warning" style={{ borderRadius: "4px", width: "80px" }} onClick={this.handleCancel}>Cancel</Button>
              </div>
            </div>
          </Row>
        </Form>
      </div>
    );
  }
}

export default ProfileSettingPage;
