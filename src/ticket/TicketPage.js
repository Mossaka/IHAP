import React from 'react';
import Solution from './Solution';
import Ticket from './Ticket';
import RelateTicket from './RelatedTicket';
import { Container, Row, Col } from 'reactstrap';
import EditTicket from './EditTicket';
import './TicketPage.css';

export default class TicketPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      solutions: []
    }

  }

  loadSolutions = (obj) => {
    let solutions = [];
    for (let s in obj) {
      solutions.push(obj[s]);
    }
    this.setState({ solutions });
  }

  render() {
    if (this.props.match.params.id === 'new') {
      return (
        <Container className="ticket-page">
          <Row>
            <Col xs={{ size: 6, offset: 3 }}>
              <EditTicket />
            </Col>
          </Row>
        </Container>
      );
    }

    return (
      <Container className="ticket-page">
        <Row>
          <Col xs="6">
            <h3>Problem</h3>
            <hr />
            <Ticket id={this.props.match.params.id} gotSolution={this.loadSolutions} />
            <div className="mt-5">
              <RelateTicket />
            </div>
          </Col>
          <Col xs="6">
            <h3>Solutions</h3>
            <hr />
            {this.state.solutions.map(s => <Solution id={s} />)}
          </Col>
        </Row>
      </Container>
    );
  }
}