/*
 * This components groups the user avatar and the follow button.
 */
import React from 'react';
import avatar from '../assets/img_avatar.png';
import { Link } from 'react-router-dom';
import Avatar from '../common/Avatar'
import firebase from 'firebase'
import './UserBar.css'
import UnfollowButton from './UnfollowButton'

export default class TicketBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: avatar,
      username: "Username"
    };
  }

  componentDidMount() {
    const uid = this.props.uid;
    firebase.database().ref('profiles/' + uid).once('value').then(snapshot => {
      this.setState({ ...snapshot.val() })
    });
  }

  render() {
    return (
      <Link className="clickable-card " to={'/profile/' + this.props.uid} style={{ textDecoration: 'none' }} >
        <div className="user-preview">
          <div className="row">
            <div className="col-6">
              <Avatar id={this.props.uid} isAnonymous={false} />
            </div>
            {this.props.currentUser ?
              <div className="col-6">
                <UnfollowButton handleUnfollow={(e) => this.props.handleUnfollow(e, this.props.uid)} />
              </div> : <div></div>
            }
          </div>
        </div>
      </Link>
    );
  }
}