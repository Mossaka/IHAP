/*
 * This component implements the voting buttons.
 */
import React from 'react';
import firebase from 'firebase';
import { MdArrowUpward, MdArrowDownward } from 'react-icons/lib/md'
import './Vote.css'

export default class Vote extends React.Component {
  constructor(props) {
    super(props);
    let l = this.props.path.split("/");
    this.state = {
      up: Number(this.props.up),
      down: Number(this.props.down),
      mood: (l[0] === 'solutions') ? 'votedSolution' : 'votedProblem',
      ticketid: l[1]
    }
  }

  handleSignIn = () => {
    if (!firebase.auth().currentUser)
      alert('please sign in to vote');
    return firebase.auth().currentUser;
  }

  refresh(nextProps) {
    let l = nextProps.path.split('/');
    this.setState({
      up: Number(nextProps.up),
      down: Number(nextProps.down),
      mood: (l[0] === 'solutions') ? 'votedSolution' : 'votedProblem',
      ticketid: l[1]
    })
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.refresh(nextProps);
      return false;
    }
    return true;
  }

  handleUpVote = () => {
    if (!this.handleSignIn()) return;
    let userId = firebase.auth().currentUser.uid;
    let url = 'notebooks/' + userId + '/' + this.state.mood;
    firebase.database().ref(url).once('value')
      .then(t => {
        if (t.val() == null) {
          let newData = {
            ticketID: this.state.ticketid,
            voted: true
          };
          firebase.database().ref('notebooks/' + userId + '/' + this.state.mood).push(newData);
          let newVote = this.state.up + 1;
          firebase.database().ref(this.props.path)
            .update({ upvote: newVote });
          this.setState({
            up: newVote,
          });
        } else {
          let res = t.val();
          let flag = false;
          for (let key in res) {
            if (res[key].ticketID === this.state.ticketid) {
              if (res[key].voted === true) {
                flag = true;
                alert("cannot upvote twice");
                break;
              } else {
                let newUpVote = this.state.up + 1;
                let newDownVote = this.state.down - 1;
                firebase.database().ref(this.props.path)
                  .update({ upvote: newUpVote });
                firebase.database().ref(this.props.path)
                  .update({ downvote: newDownVote });
                url = url + '/' + key + '/voted'
                firebase.database().ref(url).set(true);
                this.setState({
                  up: newUpVote,
                  down: newDownVote,
                });
                flag = true;
              }
            }
          }
          if (!flag) {
            let newVote = this.state.up + 1;
            let newData = {
              ticketID: this.state.ticketid,
              voted: true
            };
            firebase.database().ref('notebooks/' + userId + '/' + this.state.mood).push(newData);
            firebase.database().ref(this.props.path)
              .update({ upvote: newVote });
            this.setState({
              up: newVote,
            });
          }
        }

        let diff = this.state.up - this.state.down;
        firebase.database().ref(this.props.path).update({ votediff: diff });
      });
  }

  handleDownVote = () => {
    if (!this.handleSignIn()) return;
    let userId = firebase.auth().currentUser.uid;
    let url = 'notebooks/' + userId + '/' + this.state.mood;
    firebase.database().ref(url).once('value')
      .then(t => {
        if (t.val() == null) {
          let newData = {
            ticketID: this.state.ticketid,
            voted: false
          };
          firebase.database().ref('notebooks/' + userId + '/' + this.state.mood).push(newData);
          let newVote = this.state.down + 1;
          firebase.database().ref(this.props.path)
            .update({ downvote: newVote });
          this.setState({
            down: newVote,
          });
        } else {
          let res = t.val();
          let flag = false;
          for (let key in res) {
            if (res[key].ticketID === this.state.ticketid) {
              if (res[key].voted === false) {
                flag = true;
                alert("cannot downvote twice");
              } else {
                let newDownVote = this.state.down + 1;
                let newUpVote = this.state.up - 1;
                firebase.database().ref(this.props.path)
                  .update({ upvote: newUpVote });
                firebase.database().ref(this.props.path)
                  .update({ downvote: newDownVote });
                url = url + '/' + key + '/voted'
                firebase.database().ref(url).set(false);
                this.setState({
                  up: newUpVote,
                  down: newDownVote,
                });
                flag = true;
              }
            }
          }
          if (!flag) {
            let newVote = this.state.down + 1;
            let newData = {
              ticketID: this.state.ticketid,
              voted: false
            };
            firebase.database().ref('notebooks/' + userId + '/' + this.state.mood).push(newData);
            firebase.database().ref(this.props.path)
              .update({ downvote: newVote });
            this.setState({
              down: newVote,
            });
          }
        }

        let diff = this.state.up - this.state.down;
        firebase.database().ref(this.props.path).update({ votediff: diff });
      });
  }

  render() {
    return (
      <div className="d-flex vote">
        <div className="upvote" onClick={this.handleUpVote} >
          <MdArrowUpward width="20" height="20" style={{ color: 'rgb(83, 129, 176)' }} /> {this.state.up}
        </div>
        <div className='downvote' onClick={this.handleDownVote} >
          {this.state.down} <MdArrowDownward width="20" height="20" style={{ color: 'rgb(83, 129, 176)' }} />
        </div>
      </div>
    );
  }
}
