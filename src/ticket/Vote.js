import React from 'react';
import firebase from 'firebase';
import { MdArrowUpward, MdArrowDownward} from 'react-icons/lib/md'
import './Vote.css'

export default class Vote extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props.path + "the props value is: " + this.props.up);
    // console.log(this.props.path + "the props value is: " + this.props.down);
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
    console.log("adfs");
    if (!this.handleSignIn()) return;
    console.log("upvoted cliked");
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
          console.log("votedSolution is not created in firebaes");
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
                console.log("changing downvote to upvote");
                url = url + '/'+key + '/voted'
                console.log("the url adding to is :" + url );
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
            console.log("have not seem this before, add to firebase")
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
    console.log("downvoted cliked");
    let userId = firebase.auth().currentUser.uid;
    let url = 'notebooks/' + userId + '/' + this.state.mood;
    firebase.database().ref(url).once('value')
      .then(t => {
        if (t.val() == null) {
          let newData = {
            ticketID: this.state.ticketid,
            voted: false
          };
          console.log("creating voted problem in firebase");
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
                console.log("the url adding to is :" + url );
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
            console.log("ticket not voted before");
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
      <div className="d-flex vote">
        <div className="upvote">
          <MdArrowUpward width="20" height="20" onClick={this.handleUpVote} style={{color:'rgb(83, 129, 176)'}} /> {this.state.up}
        </div>
        <div className='downvote'>
          {this.state.down} <MdArrowDownward width="20" height="20" onClick={this.handleDownVote} style={{color:'rgb(83, 129, 176)'}}/>
        </div>
      </div>
    );
  }
}