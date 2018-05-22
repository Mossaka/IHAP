import React from 'react';
import firebase from 'firebase';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import TimeDisplay from '../common/TimeDisplay';
import Vote from './Vote';
import Avatar from '../common/Avatar';

export default class Problem extends React.Component {
  constructor(props) {
    super(props);

    firebase.database().ref('tickets/' + this.props.id).once('value').then(t => {
      this.setState({ ...t.val() });
    });
  }

  render() {
    if (!this.state) {
      return (
        <h1>Loading...</h1>
      );
    }

    return (
      <Card>
        <CardBody>
          <CardTitle>{this.state.title}</CardTitle>
        </CardBody>
        <img width="100%" src={this.state.image} />
        <CardBody>
          <CardText>{this.state.content}</CardText>
          Last Edit: <TimeDisplay time={this.state.dateEdited} />
        </CardBody>
        <Vote up={this.state.upvote} down={this.state.downvote} id={this.props.id} />
        <Avatar id={this.state.creator} />
      </Card>
    );
  }
}