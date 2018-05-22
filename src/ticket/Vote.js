import React from 'react';
import { Button } from 'reactstrap';
import firebase from 'firebase';

export default class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  handleUpVote = () => {
    let newVote = this.state.up + 1;
    firebase.database().ref('tickets/' + this.props.id)
      .update({ upvote: newVote });
    this.setState({
      up: newVote
    });
  }

  handleDownVote = () => {
    let newVote = this.state.down + 1;
    firebase.database().ref('tickets/' + this.props.id)
      .update({ downvote: newVote });
    this.setState({
      down: newVote
    });
  }

  render() {
    return (
      <div className="d-flex">
        <Button onClick={this.handleUpVote}>Up Vote</Button>
        <p className="mx-2">{this.state.up}</p>
        <p className="mx-2">{this.state.down}</p>
        <Button onClick={this.handleDownVote}>Down Vote</Button>
      </div>
    );
  }
}