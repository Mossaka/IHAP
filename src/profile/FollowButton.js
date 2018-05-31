import React from 'react';
import { Button } from 'reactstrap';
import firebase from 'firebase'
import { FaEdit } from 'react-icons/lib/fa'
import { MdPersonAdd } from 'react-icons/lib/md'

export default class FollowButton extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
        editMode: false,
        text: "Follow",
        uid: null,
        }
        this.handleFollow = this.handleFollow.bind(this)
        this.followButtonInit = this.followButtonInit.bind(this)

        if(this.props.isUserSelf) { // should be edit profile button
            this.setState({editMode: true});
        } else { // if not current user's profile, then it should be follow button
            this.followButtonInit();
        }

    } 

    followButtonInit() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ uid: user.uid });
                const db = firebase.database();
                if (user.uid !== '') {
                    const query = db.ref('networks/' + user.uid + '/followingUsers/').orderByKey();
                    query.once('value').then(snapshot => {
                        if (snapshot.exists())
                            snapshot.forEach(child => {
                                if (child.val() === this.props.profileUserID) {
                                    console.log("find the user in database");
                                    this.setState({ text: "Followed" });
                                }
                            });
                    });
                }
            }
            else {
                this.setState({ editMode: false, text: "Follow", uid: null });
            }
        });
    }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isUserSelf) 
        this.setState({editMode: true});
    else 
        this.followButtonInit()
  }

  handleFollow() {
    const db = firebase.database();
    if(this.state.uid && this.state.text === 'Follow') {
      db.ref('networks/' + this.state.uid + '/followingUsers/').push(this.props.profileUserID, error => {
        if (error)
          alert('Error has occured during saving process')
        else
          db.ref('networks/' + this.props.profileUserID + '/followedUsers/').push(this.state.uid, error => {
            if (error)
              alert('Error has occured during saving process')
            else
              this.setState({text: "Followed"})
          })
      })
    }

    else if(this.state.uid && this.state.text === 'Followed') {
      db.ref('networks/' + this.state.uid + '/followingUsers/').orderByKey().once('value').then(snapshot => {
          snapshot.forEach(child => {
              if(child.val() === this.props.profileUserID) {
                  child.ref.remove(err => {
                      if(err) alert("error has occured during unfollowing this user")
                      else 
                        db.ref('networks/' + this.props.profileUserID + '/followedUsers/').orderByKey().once('value').then(snapshot => {
                            snapshot.forEach(child => {
                                if(child.val() === this.state.uid) {
                                    child.ref.remove(err => {
                                        if(err) alert("error has occured during unfollowing this user")
                                        else {
                                            this.setState({text: "Follow"})
                                        }
                                    })
                                }
                            })
                        })
                  })
              }
          })
      })
    }

    else {
      alert("You need to sign in first!")
    }
  }

  render() {
    if(this.state.editMode)
        return <Button color={'secondary'} style={{float: 'right'}} size="sm" onClick={this.props.toggleSetting}><FaEdit width='25px' height='25px'/> Edit</Button> 
    else
        return <Button color={"primary"} style={{float:'left'}} onClick={this.handleFollow} size="sm"><MdPersonAdd width='25px' height='25px'/> {this.state.text}</Button>
  }
}