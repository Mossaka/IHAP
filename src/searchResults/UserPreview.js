import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import firebase from 'firebase';


class UserPreview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      Bio: '',
      Avatar: ''
    };

    var user = firebase.database().ref('profiles/' + this.props.userID);
    user.once('value').then((snapshot) => {
      if(snapshot.exists()) {
        this.setState({
          Username: snapshot.val().username,
          Bio: snapshot.val().biography,
          Avatar: snapshot.val().avatar
        });
      }
    });
  }

  render() {
    return (
        <div className = "container">
          <div className ="search">
            <Col xs='auto'>
              <Link to='/profile'>
                <img className="avatar" src={this.state.Avatar} style={{width: '50px'}} alt="Avatar" />
              </Link>
              <Link to='/profile'>
                <p><b>{this.state.Username}</b></p>
              </Link>
            </Col>
            <Col xs='auto'>
              <p>Biography: {this.state.Bio}</p>
            </Col>
          </div>
        </div>
    );
  }
}

export default UserPreview