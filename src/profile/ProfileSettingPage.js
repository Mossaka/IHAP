import React from 'react';
import {Link} from 'react-router';
import { Row, Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import firebase from 'firebase';

class ProfileSettingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        firstname: '',
        lastname: '',
        title: '',
        biography: '',
        avatar: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
        [name]: value
    });
  }

  handleSubmit(event) {
    // need error handling
    // console.log(this.props.uid)
    firebase.database().ref('profiles/' + this.props.uid).update({
        ...this.state
    })
    this.props.onSubmit();
    event.preventDefault();
  }

  handleImage(event) {
    let file = event.target.files[0]
    // need to error handling this. vunerable to abusing
    firebase.storage().ref().child('chicken.jpg').put(file).then(snapshot => {
        console.log('uploaded a file!');
        snapshot.ref.getDownloadURL().then(url=>{
            this.setState({avatar: url})
        })
    })
  }


  render() {
    return (
      <div className="mt-5 mx-auto p-5" style={{maxWidth: '2000px', border:'1px solid #A9A9A9'}}>
        <Form onSubmit={this.handleSubmit}>  
            <Row>
                <FormGroup className="col-md-6">
                    <Label for="firstname" className="col-form-label float-left">FIRST NAME</Label>
                    <input type="firstname" name="firstname" value={this.state.firstname} onChange={this.handleChange} className="form-control" id="InputFirstname"/>
                </FormGroup>
                <div className="form-group col-md-6">
                    <Label for="lastName" className="col-form-label float-left">LAST NAME</Label>
                    <input type="lastName" name="lastname" value={this.state.lastname} onChange={this.handleChange} className="form-control" id="InputLastName"/>
                </div>
            </Row>
            <Row>
                <FormGroup className="form-group col-md-12">
                    <Label for="title" className="col-form-label float-left">TITLE</Label>
                    <input type="title" name="title" value={this.state.title} onChange={this.handleChange} className="form-control" id="InputTitle" />
                </FormGroup>
            </Row>
            <Row>
                <FormGroup className="form-group col-md-12">
                    <Label for="biography" className="col-form-label float-left">BIOGRAPHY</Label>
                    <textarea type="biography" name="biography" value={this.state.biography} onChange={this.handleChange} className="form-control" id="InputBiography" rows="6"></textarea>
                </FormGroup>
            </Row>
            {/* <Row>
                <FormGroup className="form-group col-md-12">
                    <Label for="password" className="col-form-label float-left">PASSWORD</Label>
                    <input type="password" name='password' value={this.state.password} onChange={this.handleChange} className="form-control" id="ChangePassword" />
                </FormGroup>
            </Row> */}
            <Row>
                <FormGroup className="col-md-12">
                    <Label>Thumbnail</Label>
                    <CustomInput id="fileInput" type="file" label="Yo, pick a file!" onChange={this.handleImage}/>
                </FormGroup>
            </Row>
            <Row>
                <div className="col-md-12 float-right">
                <div className="btn-group">
                    <Button type="submit" value="Submit" className="btn btn-info">Save</Button>
                    <Button type="button" className="btn btn-warning">Cancel</Button>
                </div>
                </div>
            </Row>
        </Form>
        
      </div>
    );
  }
}

export default ProfileSettingPage;