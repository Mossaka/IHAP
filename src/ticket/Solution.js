import React from 'react';
import firebase from 'firebase';
import { Card, CardBody, CardText, Row, Col } from 'reactstrap';
import TimeDisplay from '../common/TimeDisplay';
import Vote from './Vote';
import Avatar from '../common/Avatar';
import EditSolution from './EditSolution';
import EditButton from './EditButton';
import './Solution.css';

export default class Solution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      loaded: false
    };
  }

  componentDidMount() {
    firebase.database().ref('solutions/' + this.props.id).once('value', s => {
      this.setState({ ...s.val(), loaded: true });
    });
  }

  toggleEditor = () => {
    this.setState({ edit: !this.state.edit });
  }

  render() {
    if (!this.state.loaded) {
      return <h1>Loading...</h1>;
    }

    if (this.state.edit) {
      return <EditSolution cancel={this.toggleEditor} preload={this.state} id={this.props.id} />;
    }

    return (
      <Card className="solution">
        <CardBody>
          <Row>
            <Col>
              <Avatar id={this.state.creator} isAnonymous={false} hor />
            </Col>
            <Col>
              <EditButton id={this.state.creator} onClick={this.toggleEditor} />
            </Col>
          </Row>
        </CardBody>
        <CardBody>
          <CardText dangerouslySetInnerHTML={{ __html: this.state.content }} />
          <TimeDisplay time={this.state.dateEdited} />
        </CardBody>
        <Vote up={this.state.upvote} down={this.state.downvote} path={'solutions/' + this.props.id} />
      </Card>
    );
  }
}