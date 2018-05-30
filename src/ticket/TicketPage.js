import React from 'react';
import Solution from './Solution';
import Ticket from './Ticket';
import RelateTicket from './RelatedTicket';
import { Container, Row, Col, Button } from 'reactstrap';
import EditTicket from './EditTicket';
import EditSolution from './EditSolution';
import './TicketPage.css';
import firebase from 'firebase';


export default class TicketPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      solutions: [],
      loggedIn: false,
      newsol: false
    }

    firebase.auth().onAuthStateChanged(u => {
      if (u)
        this.setState({ loggedIn: true });
      else
        this.setState({ loggedIn: false });
    });
  }

  newSolution = () => {
    this.setState({ newsol: !this.state.newsol });
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

    let newSolBtn = null;
    if (!this.state.newsol) {
      if (this.state.loggedIn) {
        newSolBtn = <Button onClick={this.newSolution}>Post New Solution</Button>;
      } else {
        newSolBtn = <h3>Sign In to Post</h3>;
      }
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
            {this.state.solutions.map(s => <Solution key={s} id={s} />)}
            {this.state.newsol && <EditSolution cancel={this.newSolution} ticket={this.props.match.params.id}/>}
            {newSolBtn}
          </Col>
        </Row>
      </Container>
    );
  }
}