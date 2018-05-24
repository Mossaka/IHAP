import React from 'react';
import firebase from 'firebase';

export default class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      up: Number(props.up),
      down: Number(props.down),
      upvoteClicked: false,
      downvoteClicked: false
    }
  }

  handleUpVote = () => {
    if (!this.state.upvoteClicked && !this.state.downvoteClicked) {
      let newVote = this.state.up + 1;
      firebase.database().ref(this.props.path)
        .update({ upvote: newVote });
      this.setState({
        up: newVote,
        upvoteClicked: true
      });
    } else if (!this.state.upvoteClicked && this.state.downvoteClicked) {
      let newUpVote = this.state.up + 1;
      let newDownVote = this.state.down - 1;
      firebase.database().ref(this.props.path)
        .update({ upvote: newUpVote });
      firebase.database().ref(this.props.path)
        .update({ downvote: newDownVote });
      this.setState({
        up: newUpVote,
        down: newDownVote,
        upvoteClicked: true,
        downvoteClicked: false
      });
    } else {
      alert("Cannot upVote twice");
    }
  }

  handleDownVote = () => {
    if (!this.state.upvoteClicked && !this.state.downvoteClicked) {
      let newVote = this.state.down + 1;
      firebase.database().ref(this.props.path)
        .update({ downvote: newVote });
      this.setState({
        downvote: newVote,
        downvoteClicked: true
      });
    } else if (this.state.upvoteClicked && !this.state.downvoteClicked) {
      let newUpVote = this.state.up - 1;
      let newDownVote = this.state.down + 1;
      firebase.database().ref(this.props.path)
        .update({ upvote: newUpVote });
      firebase.database().ref(this.props.path)
        .update({ downvote: newDownVote });
      this.setState({
        up: newUpVote,
        down: newDownVote,
        upvoteClicked: false,
        downvoteClicked: true
      });
    } else {
      alert("Cannot downVote twice");
    }
  }

  render() {
    return (
      <div className="d-flex">
        <i className="far fa-arrow-alt-circle-up" onClick={this.handleUpVote}></i>
        <p className="mx-2">{this.state.up}</p>
        <p className="mx-2">{this.state.down}</p>
        <i className="far fa-arrow-alt-circle-down" onClick={this.handleDownVote}></i>
      </div>
    );
  }
}