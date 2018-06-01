import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import './Avatar.css';
import anonymousAvatar from '../assets/anonymous-avatar.jpg';

export default class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: anonymousAvatar,
      username: 'Anonymous'
    };
  }
  
  componentDidMount() {
    if (this.props.isAnonymous) return;
    
    firebase.database().ref('profiles/' + this.props.id).once('value', snapshot => {
      this.setState({ username: snapshot.val().username });
      if (snapshot.val().avatar)
        this.setState({ avatar: snapshot.val().avatar });
    });
  }

  render() {
    if (this.props.isAnonymous) {
      return (
        <div className="avatar">
          <img src={this.state.avatar} alt="avatar" />
          {this.state.username}
        </div>
      );
    }

    return (
      <div className="avatar">
        <Link to={'/profile/' + this.props.id} className='link'>
          <img src={this.state.avatar} alt="avatar" />
          {' ' + this.state.username.substring(0, 15)}
        </Link>
      </div>
    );
  }
}
