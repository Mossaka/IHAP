/*
 * This component shows a preview of the given ticket.
 * This is used in the profile page.
 */
import React from 'react';
import './TicketPreview.css'
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Card } from 'reactstrap';
import { getTicket } from '../utils/store'
import { stripHtml } from '../utils/search';

class TicketPreview extends React.Component {
  constructor(props) {
    super(props);

    // Initialize states for this Story Preview component
    this.state = {
      ticketTitle: "Ticket Title!!",
      ticketDetails: "Ticket details... ",
      image: null,
    };
  }

  componentDidMount() {
    // Get the ticket from database
    if (this.props.ticketID) {
      getTicket(this.props.ticketID, t => {
        this.setState({
          image: t.image,
          ticketTitle: t.title.substring(0, 30),
          ticketDetails: (stripHtml(t.content).length < 200) ? (stripHtml(t.content)) : (stripHtml(t.content).substr(0, 197) + '...'),
          anonymous: t.anonymous,
          creator: t.creator,
          ticketID: this.props.ticketID
        });
      });
    }
    else {
      const solutionID = this.props.solutionID;
      const db = firebase.database();
      db.ref("solutions/" + solutionID + '/ticket/').once('value', snapshot => {
        const ticketID = snapshot.val();
        getTicket(ticketID, t => {
          this.setState({
            image: t.image,
            ticketTitle: t.title.substring(0, 30),
            ticketDetails: (stripHtml(t.content).length < 200) ? (stripHtml(t.content)) : (stripHtml(t.content).substr(0, 197) + '...'),
            anonymous: t.anonymous,
            creator: t.creator,
            ticketID: ticketID
          });
        });
      });
    }
  }

  render() {
    return (
      <Card className="ticket-preview card">
        <Link className="clickable-card" to={'/ticket/' + this.state.ticketID}></Link>
        <div className="row">
          <div className="textbox col-9">
            <div className="title">
              <h5><b>{this.state.ticketTitle}</b></h5>
            </div>
            <div className="description">
              <p>{this.state.ticketDetails}</p>
            </div>
          </div>
          <div className="col-3 pt-3">
            <img className="img-thumbnail" src={this.state.image} alt="ticket thumbnail" />
          </div>
        </div>
      </Card>
    );
  }
}

export default TicketPreview
