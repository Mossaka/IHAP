import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import TimeDisplay from '../common/TimeDisplay';
import Vote from './Vote';
import Avatar from '../common/Avatar';
import EditTicket from './EditTicket';
import Bookmark from '../common/Bookmark';
import { getTicket } from '../utils/store';
import EditButton from './EditButton';

export default class Ticket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      loaded: false
    };
  }

  refresh() {
    getTicket(this.props.id, t => {
      this.setState({ ...t, loaded: true });
      this.props.gotSolution(t.solutions);
    });
  }

  componentDidMount() {
    this.refresh();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.refresh();
      return false;
    }
    return true;
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
        <img width="100%" src={this.state.image} alt="ticket thumbnail" />
        <CardBody>
          <CardText dangerouslySetInnerHTML={{ __html: this.state.content }} />
          Last Edit: <TimeDisplay time={this.state.dateEdited} />
          <Vote up={this.state.upvote} down={this.state.downvote} path={'tickets/' + this.props.id} />
          <Bookmark id={this.props.id} />
          <Avatar id={this.state.creator} isAnonymous={this.state.anonymous} hor />
          <EditButton id={this.state.creator} onClick={this.toggleEditor} />
        </CardBody>
      </Card>
    );
  }
}