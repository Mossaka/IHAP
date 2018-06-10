/*
 * This component hosts everything on the ticket page.
 */
import React from 'react';
import Solution from './Solution';
import Ticket from './Ticket';
import RelateTicket from './RelatedTicket';
import { Container, Row, Col, Button } from 'reactstrap';
import EditTicket from './EditTicket';
import EditSolution from './EditSolution';
import './TicketPage.css';
import { GlobalContext } from '../utils/context';
import '../common/StyleButton.css';
import firebase from 'firebase';

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
    let db = firebase.database();
    let solutions = [];
    let cnt = 0, len = 0;
    for (let s in obj) {
      len = len + 1;
    }
    for (let s in obj) {
      db.ref('solutions/' + obj[s] + '/votediff').on('value', snapshot => {
        solutions.push([obj[s], snapshot.val()]);
        cnt = cnt + 1;
        if(cnt === len) {
          this.setState({
            solutions: solutions.sort(function(a, b) {
              return a[1] > b[1] ? -1 : 1;
            }).map(s => s[0])
          });
        }
      });
    }
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
          <Col md="6">
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
          <Col md="6">
            <Row>
              <Col>
                <h3>Solutions</h3>
              </Col>
              <Col>
                {!this.state.newsol && <GlobalContext.Consumer>
                  {user => user ?
                    <Button className="postSolutionButton" onClick={this.toggleEditor}>Post New Solution</Button> :
                      <div>Sign In to Post</div>
                  }
                  </GlobalContext.Consumer>}
              </Col>
            </Row>
            <hr />
            {this.state.newsol && <EditSolution cancel={this.toggleEditor} ticket={this.props.match.params.id} />}
            {this.state.solutions.map(s => <Solution key={s} id={s} />)}
          </Col>
        </Row>
      </Container>
    );
  }
}
