import React from 'react';
import {Link} from 'react-router';

class ProfileSettingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        firstname: '',
        lastname: '',
        title: '',
        biography: '',
        password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    alert("The new name is " + this.state.firstname + " " + this.state.lastname)
    this.props.onSubmit();
    event.preventDefault();
  }


  render() {
    return (
      <div className='profile-setting-page'>
        <form onSubmit={this.handleSubmit}>  
            <div className="row">
                <div className="form-group col-md-6">
                    <label for="firstname" className="col-form-label float-left">FIRST NAME</label>
                    <input type="firstname" name="firstname" value={this.state.firstname} onChange={this.handleChange} className="form-control" id="InputFirstname"/>
                </div>
                <div className="form-group col-md-6">
                    <label for="lastName" className="col-form-label float-left">LAST NAME</label>
                    <input type="lastName" name="lastname" value={this.state.lastname} onChange={this.handleChange} className="form-control" id="InputLastName"/>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-md-12">
                    <label for="title" className="col-form-label float-left">TITLE</label>
                    <input type="biography" name="title" value={this.state.title} onChange={this.handleChange} className="form-control" id="InputTitle" />
                </div>
            </div>
            <div className="row">
                <div className="form-group col-md-12">
                    <label for="biography" className="col-form-label float-left">BIOGRAPHY</label>
                    <textarea type="biography" name="biography" value={this.state.lastname} onChange={this.handleChange} className="form-control" id="InputBiography" rows="6"></textarea>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-md-12">
                    <label for="password" className="col-form-label float-left">PASSWORD</label>
                    <input type="password" name='password' value={this.state.password} onChange={this.handleChange} className="form-control" id="ChangePassword" />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 float-right">
                <div className="btn-group">
                    <button type="submit" value="Submit" className="btn btn-info">Save</button>
                    <button type="button" className="btn btn-warning">Cancel</button>
                </div>
                </div>
            </div>
        </form>
        
      </div>
    );
  }
}

export default ProfileSettingPage;