/*
 * This component is the host for everything on the home page.
 */
import React from 'react';
import StoryPreview from './StoryPreview';
import { weightedSearch } from '../utils/search';
import './HomePage.css';
import { Container, Row, Col } from 'reactstrap';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topCards: [],
      recentCards: []
    };
  }

  componentDidMount() {
    this.generateTopCards(4);
    this.generateRecentCards(12);
  }

  generateCard(id) {
    return (
      <Col sm="6" md="4" lg="3" key={id}>
        <StoryPreview id={id} />
      </Col>
    );
  }

  generateTopCards(num) {
    weightedSearch('', num, { dateEdited: 2, rating: 2, upvotes: 1 }, ids => {
      let topCards = ids.map(id => this.generateCard(id));
      this.setState({ topCards });
    });
  }

  generateRecentCards(num) {
    weightedSearch('', num, { dateEdited: 1 }, ids => {
      let recentCards = ids.map(id => this.generateCard(id));
      this.setState({ recentCards });
    });
  }

  render() {
    return (
      <Container className="homepage">
        <br/>
        <h2>Top Stories</h2>
        <hr />
        <Row>
          {this.state.topCards}
        </Row>

        <h2>Recent Stories</h2>
        <hr />
        <Row>
          {this.state.recentCards}
        </Row>
      </Container>
    );
  }
}
