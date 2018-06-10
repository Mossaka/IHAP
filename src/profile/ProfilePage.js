/*
 * This component is the host for everything on the profile page.
 */
import React from 'react';
import { Container } from 'reactstrap';
import './ProfilePage.css';
import ProfileSettingPage from './ProfileSettingPage';
import firebase from 'firebase';
import FollowButton from './FollowButton';
import UnfollowButton from './UnfollowButton';
import EditButton from './EditButton';
import UserInfo from './UserInfo';
import TicketUserTab from './TicketUserTab';

export default class ProfilePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      setting: false,
      tickets: [],
      solutions: [],
      bookmarked: [],
      followingUsers: [],
      followedUsers: [],
      currentUser: null,
      followed: false,
      profileUserID: null,
      loginUserID: null,
    };
    this.checkLoginUser(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const profileUserID = nextProps.match.params.id // the user id for current page
    this.setState({
      setting: false,
      tickets: [],
      solutions: [],
      bookmarked: [],
      followingUsers: [],
      followedUsers: [],
      currentUser: null,
      followed: false,
      profileUserID: null,
      loginUserID: null,
    });
    this.checkLoginUser(profileUserID);
  }

  checkLoginUser(profileUserID) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (user.uid === profileUserID) { // the profile page is login user's profile
          this.setState({ currentUser: true, profileUserID: user.uid, loginUserID: user.uid });
          this.retriveData(user.uid);
        }
        else {
          this.setState({ currentUser: false, profileUserID: profileUserID, loginUserID: user.uid });
          firebase.database().ref('networks/' + user.uid + '/followingUsers/').once('value', snapshot => {
            if (snapshot.exists()) {
              snapshot.forEach(child => {
                if (child.val() === profileUserID) {
                  this.setState({ followed: true });
                }
              });
            }
          });
          this.retriveData(profileUserID);
        }
      }
      else {
        this.setState({ profileUserID: profileUserID })
        this.retriveData(profileUserID);
      }
    })
  }

  retriveData(uid) {
    let db = firebase.database();
    db.ref('profiles/' + uid).once('value', snapshot => {
      const profiles = { ...snapshot.val() };
      db.ref('networks/' + uid).once('value', snapshot => {
        const networks = { ...snapshot.val() };
        db.ref('notebooks/' + uid).once('value', snapshot => {
          const notebooks = { ...snapshot.val() };
          this.setState({ ...networks, ...profiles, ...notebooks });
        });
      });
    });
  }

  toggleSetting = () => {
    this.setState({ setting: !this.state.setting });
  }

  handleFollow = e => {
    e.preventDefault();
    e.stopPropagation();
    const db = firebase.database();
    db.ref('networks/' + this.state.loginUserID + '/followingUsers/').push(this.state.profileUserID, error => {
      db.ref('networks/' + this.state.profileUserID + '/followedUsers/').push(this.state.loginUserID, error => {
        this.setState({ followed: true });
        window.location.reload();
      })
    })
  }

  handleUnfollow = (e, unfollowID = null) => {
    e.preventDefault();
    e.stopPropagation();
    const db = firebase.database();
    db.ref('networks/' + this.state.loginUserID + '/followingUsers/').orderByKey().once('value', snapshot => {
      snapshot.forEach(child => {
        if (child.val() === (unfollowID ? unfollowID : this.state.profileUserID)) {
          child.ref.remove(err => {
            db.ref('networks/' + (unfollowID ? unfollowID : this.state.profileUserID) + '/followedUsers/').once('value', snapshot => {
              snapshot.forEach(child => {
                if (child.val() === this.state.loginUserID) {
                  child.ref.remove(err => {
                    this.setState({ followed: false });
                    if (unfollowID) window.location.reload();
                  });
                }
              });
            });
          });
        }
      });
    });
  }

  toggleButton = () => {
    if (this.state.currentUser !== null) {
      if (this.state.currentUser === true) {
        return <EditButton toggleSetting={this.toggleSetting} />;
      } 
      else if (this.state.followed !== null) {
        if (this.state.followed)
          return <UnfollowButton handleUnfollow={this.handleUnfollow} />;
        else
          return <FollowButton handleFollow={this.handleFollow} />;
      }
    }
  }

  render() {
    if (this.state.setting) {
      return (
        <Container>
          <UserInfo profileUserID={this.state.profileUserID} toggleButton={this.toggleButton} />
          <ProfileSettingPage onSubmit={this.toggleSetting} uid={this.state.loginUserID} />
        </Container>
      );
    } 
    else {
      return (
        <Container className="profilepage">
          <UserInfo profileUserID={this.state.profileUserID} toggleButton={this.toggleButton} />
          <br/>
          <TicketUserTab
            tickets={this.state.tickets}
            solutions={this.state.solutions}
            bookmarked={this.state.bookmarked}
            followedUsers={this.state.followedUsers}
            followingUsers={this.state.followingUsers}
            currentUser={this.state.currentUser}
            handleUnfollow={this.handleUnfollow}
          />
        </Container>
      );
    }
  }
}
