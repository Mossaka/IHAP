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
    this.refresh(this.props.id);
  }

  shouldComponentUpdate(nextProp) {
    if (this.props.isAnonymous) return true;
    if (nextProp.id !== this.props.id) {
      this.refresh(nextProp.id);
      return false;
    }
    return true;
  }

  refresh(id) {
    firebase.database().ref('profiles/' + id).once('value', snapshot => {
      this.setState({
        username: snapshot.val().username,
        link: '/profile/' + id
      });
      if (snapshot.val().avatar) {
        this.setState({ avatar: snapshot.val().avatar });
      }
      else {
        this.setState({ avatar: anonymousAvatar });
      }
    });
  }

  render() {
    return (
      <div className="avatar">
        <Link to={this.state.link}>
          <img src={this.state.avatar} alt="avatar" />
          <span>{' ' + this.state.username.substring(0, 15)}</span>
        </Link>
      </div>
    );
  }
}
