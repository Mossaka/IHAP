import React from 'react';
import firebase from 'firebase';

export default class Vote extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.path + "the props value is: " + this.props.up);
    console.log(this.props.path + "the props value is: " + this.props.down);
    let l = this.props.path.split("/");
    this.state = {
      up: Number(this.props.up),
      down: Number(this.props.down),
      loggedIn: false,
      mood: (l[0] === 'solutions') ? 'votedSolution' : 'votedProblem',
      ticketid: l[1]
    }

    firebase.auth().onAuthStateChanged(user => {
      if (user) this.setState({ loggedIn: true });
      else this.setState({ loggedIn: false });
    });
  }

  handleSignIn = () => {
    if (!this.state.loggedIn)
      alert('please sign in to vote');
    return this.state.loggedIn;
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
          alert("upvoted");
        } else {
          let res = t.val();
          let flag = false;
          for (let key in res) {
            if (res[key].ticketID === this.state.ticketid) {
              if (res[key].voted === true) {
                flag = true;
                alert("cannot upvote twice");
              } else {
                let newUpVote = this.state.up + 1;
                let newDownVote = this.state.down - 1;
                firebase.database().ref(this.props.path)
                  .update({ upvote: newUpVote });
                firebase.database().ref(this.props.path)
                  .update({ downvote: newDownVote });
                let url = 'notebooks/' + userId + '/' + this.state.mood + '/' + key + '/' + 'voted';
                console.log(url);
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
      });
  }
  // firebase.database().
  //   ref(this.props.ticketInfor + userId + '/votedProblem').once('value').then(t=>{
  //     console.log(userId);
  //     console.log(t);
  //   });

  //   ref(this.props.ticketInfor + userId + '/votedProblem').push(ticketid);



  //   firebase.database().ref(this.props.path)
  //     .update({ upvote: newVote });
  //   this.setState({
  //     up: newVote,
  //     upvoteClicked: true
  //   });
  // } else if (!this.state.upvoteClicked && this.state.downvoteClicked) {
  //   let newUpVote = this.state.up + 1;
  //   let newDownVote = this.state.down - 1;
  //   firebase.database().ref(this.props.path)
  //     .update({ upvote: newUpVote });
  //   firebase.database().ref(this.props.path)
  //     .update({ downvote: newDownVote });
  //   this.setState({
  //     up: newUpVote,
  //     down: newDownVote,
  //     upvoteClicked: true,
  //     downvoteClicked: false
  //   });
  // } else {
  //   alert("Cannot upVote twice");
  // }


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
                let url = 'notebooks/' + userId + '/' + this.state.mood + '/' + key + '/' + 'voted';
                console.log(url);
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
      });
  }

  render() {
    return (
      <div className="d-flex">
        <svg width="20" height="20" onClick={this.handleUpVote}>
          <g><path d="M12 8l-6 6 1.41 1.41 4.59-4.58 4.59 4.58 1.41-1.41z"></path></g>
        </svg>
        <p className="mx-2">{this.state.up}</p>
        <p className="mx-2">{this.state.down}</p>
        <svg width="20" height="20" onClick={this.handleDownVote}>
          <g><path d="M16.59 8.59l-4.59 4.58-4.59-4.58-1.41 1.41 6 6 6-6z"></path></g>
        </svg>
      </div>
    );
  }
}