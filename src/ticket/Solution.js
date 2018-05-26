import React from 'react';
import firebase from 'firebase';
import { Card, CardBody, CardText } from 'reactstrap';
import TimeDisplay from '../common/TimeDisplay';
import Vote from './Vote';
import Avatar from '../common/Avatar';

export default class Solution extends React.Component {
  constructor(props) {
    super(props);

    firebase.database().ref('solutions/' + this.props.id).once('value').then(s => {
      this.setState({ ...s.val() });
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
          <CardText dangerouslySetInnerHTML={{ __html: this.state.content }}></CardText>
          Last Edit: <TimeDisplay time={this.state.dateEdited} />
        </CardBody>
        <Vote up={this.state.upvote} down={this.state.downvote} path={'solutions/' + this.props.id} />
        <Avatar id={this.state.creator} />
      </Card>
    );
  }
}