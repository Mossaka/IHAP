/*
 * This component defines the get random ticket button.
 * Click on this button to get a random ticket.
 */
import React from 'react';
import { Button } from 'reactstrap';
import './GetRandomTicketButton.css';
import { getTickets } from '../utils/store';
import { withRouter } from 'react-router-dom';

class GetRandomTicketButton extends React.Component {
  componentDidMount() {
    getTickets(tickets => {
      let ids = [];
      let count = 0;
      for (let t in tickets) {
        ids.push(t);
        count++;
      }
      this.ticketIDs = ids;
      this.numTickets = count;
    });
  }

  loadRandomTicket = () => {
    if (!this.ticketIDs) return;

    let ticketKey = this.ticketIDs[Math.floor(Math.random() * this.numTickets)];
    if (ticketKey !== this.ticketDisplayed) {
      this.ticketDisplayed = ticketKey;
      this.props.history.push('/ticket/' + ticketKey);
    }
  }

  makeButton = (text) => {
    return (
      <Button className="randomButton" onClick={this.loadRandomTicket}>
        {text}
      </Button>
    );
  }

  render() {
    return (
      <div className="getRandomButton">
        {this.makeButton(this.props.buttonText)}
      </div>
    )
  }
}

export default withRouter(GetRandomTicketButton);
