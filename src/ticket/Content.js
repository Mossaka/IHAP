import React from 'react';
import { Card, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import Editor from './Editor';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  handleUpVote = () => {
    let newUpVote = this.state.upvote + 1;
    this.setState({
      upvote: newUpVote
    });
  }

  handleDownVote = () => {
    let newdownvote = this.state.downvote + 1;
    this.setState({
      downvote: newdownvote
    });
  }

  render() {
    return (
      <Card className="mt-5">
        <CardBody>
          <CardText>{this.props.content}</CardText>
          <div class="d-flex bd-highlight mb-4">
            <div className="p-2 bd-highlight" onClick={this.handleUpVote} ><i className="far fa-arrow-alt-circle-up"></i> </div>
            <div className="p-2 bd-highlight"><p> {this.state.upvote} / {this.state.downvote}</p></div>
            <div className="p-2 bd-highlight" onClick={this.handleDownVote}><i className="far fa-arrow-alt-circle-down"></i></div>
          </div>
        </CardBody>
      </Card>
    );
  }
}