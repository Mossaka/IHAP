import React from 'react';
import { Card, CardText, CardBody } from 'reactstrap';

export default class Content extends React.Component {

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
            <Vote/>
          </div>
        </CardBody>
      </Card>
    );
  }
}