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
    if (props.match.params.id === 'new') return;
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="6">
            <h3>Problem</h3>
            <hr />
            <Ticket id={this.props.match.params.id} />
            <div className="mt-5">
              <RelateTicket />
            </div>
          </Col>
          <Col xs="6">
            <h3>Solutions</h3>
            <hr />

          </Col>
        </Row>
      </Container>
    );
  }
}