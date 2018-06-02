import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardText, Button, CardImg } from 'reactstrap';
import TimeDisplay from '../common/TimeDisplay';
import Vote from './Vote';
import Avatar from '../common/Avatar';
import EditTicket from './EditTicket';
import Bookmark from '../common/Bookmark';
import { getTicket } from '../utils/store';
import { GlobalContext } from '../utils/context';

export default class Ticket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      loaded: false
    };
  }

  componentDidMount() {
    getTicket(this.props.id, t => {
      this.setState({ ...t, loaded: true });
      this.props.gotSolution(t.solutions);
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
      return <EditTicket cancel={this.toggleEditor} preload={this.state} id={this.props.id} />;
    }

    return (
      <Card>
        <CardBody>
          <CardTitle>{this.state.title}</CardTitle>
        </CardBody>
        <CardImg src={this.state.image} alt="ticket thumbnail" />
        <CardBody>
          <CardText dangerouslySetInnerHTML={{ __html: this.state.content }}></CardText>
          Last Edit: <TimeDisplay time={this.state.dateEdited} />
        </CardBody>
        <Row>
          <Col>
            <Vote up={this.state.upvote} down={this.state.downvote} path={'tickets/' + this.props.id} />
          </Col>
          <Col>
            <Bookmark id={this.props.id} />
          </Col>
        </Row>
        {this.state.creator && <Avatar id={this.state.creator} isAnonymous={this.state.anonymous} />}
        <GlobalContext.Consumer>
          {user => {
            if (user && user.uid === this.state.creator)
              return <Button onClick={this.toggleEditor}>Edit</Button>
          }}
        </GlobalContext.Consumer>
      </Card>
    );
  }
}