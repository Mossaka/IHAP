import React from 'react';
import firebase from 'firebase';
import { Card, CardBody, CardText, Button } from 'reactstrap';
import TimeDisplay from '../common/TimeDisplay';
import Vote from './Vote';
import Avatar from '../common/Avatar';
import EditSolution from './EditSolution';

export default class Solution extends React.Component {
  constructor(props) {
    super(props);

    firebase.database().ref('solutions/' + this.props.id).once('value').then(s => {
      this.setState({ ...s.val() });

      firebase.auth().onAuthStateChanged(user => {
        if (user && user.uid === s.val().creator)
          this.setState({ editable: true });
        else
          this.setState({ editable: false });
      });
    });
  }

  edit = () => {
    this.setState({ edit: !this.state.edit });
  }

  render() {
    if (!this.state) {
      return (
        <h1>Loading...</h1>
      );
    }

    if (this.state.edit) {
      let preload = {
        content: this.state.content,
      };

      return (
        <EditSolution cancel={this.edit} preload={preload} id={this.props.id}/>
      );
    }

    return (
      <Card>
        <CardBody>
          <CardText dangerouslySetInnerHTML={{ __html: this.state.content }}></CardText>
          Last Edit: <TimeDisplay time={this.state.dateEdited} />
        </CardBody>
        <Vote up={this.state.upvote} down={this.state.downvote} path={'solutions/' + this.props.id} />
        <Avatar id={this.state.creator} isAnonymous={false} />
        {this.state.editable && <Button onClick={this.edit}>Edit</Button>}
      </Card>
    );
  }
}