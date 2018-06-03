import React from 'react';
import Solution from './Solution';
import Ticket from './Ticket';
import RelateTicket from './RelatedTicket';
import { Container, Row, Col, Button } from 'reactstrap';
import EditTicket from './EditTicket';
import EditSolution from './EditSolution';
import './TicketPage.css';
import { GlobalContext } from '../utils/context';

export default class TicketPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      solutions: [],
      newsol: false
    };
  }

  toggleEditor = () => {
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

    return (
      <Container className="ticket-page mt-3">
        <Row>
          <Col xs="6">
            <Row>
              <Col>
              <h3>Problem</h3>
              </Col>
            </Row>
            <hr />
            <Ticket id={this.props.match.params.id} gotSolution={this.loadSolutions} />
            <div className="mt-5">
              <RelateTicket id={this.props.match.params.id} />
            </div>
          </Col>
          <Col xs="6">
            <Row>
              <Col>
                <h3>Solutions</h3>
              </Col>
              <Col>
                {!this.state.newsol && <GlobalContext.Consumer>
                  {user => user ?
                      <Button className="postSolutionButton" size='sm' onClick={this.toggleEditor}>Post New Solution</Button> :
                      <h3>Sign In to Post</h3>
                  }
                  </GlobalContext.Consumer>}
              </Col>
            </Row>
            <hr />
            {this.state.solutions.map(s => <Solution key={s} id={s} />)}
            {this.state.newsol && <EditSolution cancel={this.toggleEditor} ticket={this.props.match.params.id} />}
          </Col>
        </Row>
      </Container>
    );
  }
}