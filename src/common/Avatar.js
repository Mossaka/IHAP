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
      username: 'Anonymous',
      link: '#'
    };
  }
  
  componentDidMount() {
    if (this.props.isAnonymous) return;
    
    firebase.database().ref('profiles/' + this.props.id).once('value', snapshot => {
      this.setState({ 
        username: snapshot.val().username,
        link: '/profile/' + this.props.id
      });
      if (snapshot.val().avatar)
        this.setState({ avatar: snapshot.val().avatar });
    });
  }

  render() {
    return (
      <div className="avatar">
        <Link to={this.state.link}>
          <img src={this.state.avatar} alt="avatar" />
          <a className={`${this.props.hor ? 'd-inline' : ''}`}>{' ' + this.state.username.substring(0, 15)}</a>
        </Link>
      </div>
    );
  }
}
