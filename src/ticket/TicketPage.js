import React from 'react';
import Content from './Content';
import RelateTicket from './RelatedTicket';
import { Container, Row, Col } from 'reactstrap';

export default class TicketPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="6">
            <h3>Problem</h3>
            <hr />
            <Content />
            <div className="mt-5">
              <RelateTicket />
            </div>
          </Col>
          <Col xs="6">
            <h3>Solutions</h3>
            <hr />
            <Content />
            <Content />
          </Col>
        </Row>
      </Container>
    );
  }
}