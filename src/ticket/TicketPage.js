import React from 'react';
import Solution from './Solution';
import Content from './Content';
import Ticket from './Ticket';
import RelateTicket from './RelatedTicket';
import { Container, Row, Col } from 'reactstrap';
import firebase from 'firebase';

export default class TicketPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      solutions: []
    }
    if (props.match.params.id === 'new') return;
  }

  loadSolutions = (obj) => {
    let solutions = [];
    for (let s in obj) {
      solutions.push(obj[s]);
    }
    this.setState({ solutions });
  }

  render() {
    let sols = this.state.solutions.map(s => <Solution id={s} />);

    return (
      <Container>
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
            {sols}
          </Col>
        </Row>
      </Container>
    );
  }
}