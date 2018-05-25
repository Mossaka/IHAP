import React from 'react';
import { Row, Button, Form, FormGroup, Label, CustomInput } from 'reactstrap';
import firebase from 'firebase';

class ProfileSettingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        profile: {
            firstname: null,
            lastname: null,
            title: null,
            biography: null,
            avatar: null,
        },
        fileState: 'Yo, pick a file!',
        file: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
      let db = firebase.database();
      db.ref('profiles/' + this.props.uid).once('value').then(snapshot => {
          this.setState({profile: {
              ...snapshot.val()
          }})
      })
  } 

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
        profile: {
            ...this.state.profile,
            [name]: value
        }
    });
  }

  handleSubmit(event) {
    // need error handling
    // console.log(this.props.uid)
    

    if(this.state.file !== null) {
        let file = this.state.file
        let uploadTask = firebase.storage().ref().child('avatars/' + file.name).put(file)
        uploadTask.on('state_changed', snapshot => {
            // state change
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({fileState: 'Upload is ' + progress + '% done'});
        }, error => {
            // error handling
            this.setState({fileState: error})
        }, () => {
            // file upload succes
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                this.setState({
                    profile: {...this.state.profile, avatar: url}, 
                    fileState: 'file uploading success!'
                })
                firebase.database().ref('profiles/' + this.props.uid).update({
                    ...this.state.profile
                })
                this.props.onSubmit();
            })
        })
    } else {
        firebase.database().ref('profiles/' + this.props.uid).update({
            ...this.state.profile
        })
        this.props.onSubmit();
    }

    event.preventDefault();
  }
  
  handleCancel(event) {
      this.props.onSubmit();    
  }

  handleImage(event) {
    let file = event.target.files[0]
    this.setState({file: file, fileState: 'upload success!'})
  }


  render() {
    return (
      <div className="mt-5 mx-auto p-5" style={{maxWidth: '2000px', border:'1px solid #A9A9A9'}}>
        <Form onSubmit={this.handleSubmit}>  
            <Row>
                <FormGroup className="col-md-6">
                    <Label for="firstname" className="col-form-label float-left">FIRST NAME</Label>
                    <input type="firstname" name="firstname" value={this.state.profile.firstname} onChange={this.handleChange} className="form-control" id="InputFirstname"/>
                </FormGroup> 
                <div className="form-group col-md-6">
                    <Label for="lastName" className="col-form-label float-left">LAST NAME</Label>
                    <input type="lastName" name="lastname" value={this.state.profile.lastname} onChange={this.handleChange} className="form-control" id="InputLastName"/>
                </div>
            </Row>
            <Row>
                <FormGroup className="form-group col-md-12">
                    <Label for="title" className="col-form-label float-left">TITLE</Label>
                    <input type="title" name="title" value={this.state.profile.title} onChange={this.handleChange} className="form-control" id="InputTitle" />
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
                    <Label>Thumbnail</Label>
                    <CustomInput id="fileInput" type="file" label={this.state.fileState} onChange={this.handleImage}/>
                </FormGroup>
            </Row>
            <Row>
                <div className="col-md-12 float-right">
                <div className="btn-group">
                    <Button type="submit" value="Submit" className="btn btn-info">Save</Button>
                    <Button type="button" className="btn btn-warning" onClick={this.handleCancel}>Cancel</Button>
                </div>
                </div>
            </Row>
        </Form>
        
      </div>
    );
  }
}

export default ProfileSettingPage;