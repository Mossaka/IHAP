import React from 'react';
import { Link } from 'react-router-dom';
//import avatar from '../assets/img_avatar.png'
// import bookmark from '../assets/bookmark.png'
import './SearchPreview.css'
import Bookmark from '../common/Bookmark';
import Avatar from '../common/Avatar'
import { stripHtml } from '../utils/search';
import { getTicket } from '../utils/store';

export default class SearchPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketTitle: 'Ticket Title!!',
      ticketDetails: 'Ticket details... '
    };
  }

  componentDidMount() {
    getTicket(this.props.id, t => {
      let plaintext = stripHtml(t.content);
      this.setState({
        image: t.image,
        ticketTitle: t.title.substring(0, 30),
        ticketDetails: plaintext.length < 200 ? plaintext : plaintext.substr(0, 197) + '...',
        anonymous: t.anonymous,
        creator: t.creator
      });
    });
  }

  render() {
    return (
      <div className="search-result">
        <div className="textbox">
          <Link to={'/ticket/' + this.props.id}>
            <h5>{this.state.ticketTitle}</h5>
            <p>{this.state.ticketDetails}</p>
          </Link>
        </div>
        {this.state.creator && <Avatar id={this.state.creator} isAnonymous={this.state.anonymous} />}
        <Bookmark id={this.props.id} />
      </div>
    );
  }
}