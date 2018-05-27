import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container } from 'reactstrap';
import firebase from 'firebase';
import './SearchPreview.css'
import Avatar from '../common/Avatar'


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
        <Container>
          <div className ="search">
            <Col xs="2">
              <Avatar id={this.props.userID} />
            </Col>
            <Col xs='10'>
                <Container>
                  <p>{this.state.Bio}</p>
                </Container>
            </Col>
          </div>
        </Container>
    );
  }
}

export default UserPreview