import React from 'react';
import Solution from './Solution';
import RelateTicket from './RelatedTicket';
import { Container, Row, Col } from 'reactstrap';
import firebase from 'firebase';

export default class TicketPage extends React.Component {
  constructor(props) {
    super(props);
    if (props.match.params.id === 'new') return;

    let db = firebase.database();
    db.ref('tickets/' + this.props.match.params.id).once('value').then(t => {
      this.setState({ ...t.val() });
    });
  }

  render() {

    return (
      <Container>
        <Row>
          <Col xs="6">
            <h3>Problem</h3>
            <hr />

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