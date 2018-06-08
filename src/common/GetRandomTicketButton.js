import React from 'react';
import { Button } from 'reactstrap';
import './GetRandomTicketButton.css';
import { getTickets } from '../utils/store';

import { withRouter } from 'react-router-dom';

class GetRandomTicketButton extends React.Component {
    constructor(props) {
        super(props);
        
        this.loadRandomTicket = this.loadRandomTicket.bind(this);
        this.makeButton = this.makeButton.bind(this);
    }

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
              <div className="get-random-button"> 
                    {this.makeButton(this.props.buttonText)}
              </div>
          )
      }
}

export default withRouter(GetRandomTicketButton);
