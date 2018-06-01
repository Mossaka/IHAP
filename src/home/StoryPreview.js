import React from 'react';
import { Link } from 'react-router-dom';
import greycard from '../assets/greycard.jpg';
import './StoryPreview.css';
import Bookmark from '../common/Bookmark';
import Avatar from '../common/Avatar';
import { stripHtml } from '../utils/search';
import { getTicket } from '../utils/store';
import { Card, CardBody, CardTitle, CardImg, CardText } from 'reactstrap';

export default class StoryPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: greycard,
      title: 'Ticket Title!!',
      content: 'Ticket details... ',
      anonymous: true,
      creator: ''
    }
  }

  componentDidMount() {
    getTicket(this.props.id, t => {
      let plaintext = stripHtml(t.content);
      this.setState({
        image: t.image,
        title: t.title.substring(0, 30),
        content: plaintext.length < 100 ? plaintext : plaintext.substr(0, 97) + '...',
        anonymous: t.anonymous,
        creator: t.creator
      });
    });
  }

  render() {
    return (
      <Card className="story-preview">
        <Link className="clickable-card" to={'/ticket/' + this.props.id} />
        <CardImg top src={this.state.image} alt="ticket thumbnail" />
        <CardBody className="body">
          <CardTitle>{this.state.title}</CardTitle>
          <CardText>{this.state.content}</CardText>
        </CardBody>
        <CardBody className="bottomLine">
          {this.state.creator && <Avatar id={this.state.creator} isAnonymous={this.state.anonymous} />}
          <Bookmark id={this.props.id} />
        </CardBody>
      </Card>
    );
  }
}
