/*
 * This component displays the user avatar and username from a given user id.
 */
import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import './Avatar.css';
import anonymousAvatar from '../assets/anonymous-avatar.jpg';

export default class Avatar extends React.Component {
  constructor(props) {
    super(props);
    // the default state for anonymouse user
    // this is also shown when the actual user data is being loaded
    this.state = {
      avatar: anonymousAvatar,
      username: 'Anonymous',
      link: '#'
    };
  }

  // this is a React component life cycle hook
  // start loading username and avatar once this component is mounted
  componentDidMount() {
    this.refresh(this.props.id);
  }

  // this is a React component life cycle hook
  // reload the username and avatar if the given user is has been changed
  shouldComponentUpdate(nextProp) {
    if (nextProp.id !== this.props.id) {
      this.refresh(nextProp.id);
      return false;
    }
    return true;
  }

  // the controller of this component. 
  // it connects the database and updates the UI when the data is available
  refresh(id) {
    // don't load an anonymous user
    if (this.props.isAnonymous) return;

    // access the data model through firebase API
    firebase.database().ref('profiles/' + id).once('value', snapshot => {
      let value = snapshot.val();
      // update UI with the new data
      this.setState({
        username: value.username,
        link: '/profile/' + id
      });
      if (value.avatar) {
        this.setState({ avatar: value.avatar });
      }
      else {
        this.setState({ avatar: anonymousAvatar });
      }
    });
  }

  // the view of this component
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
