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

  // generateRecommendedCards(num) {
  //   var self = this;
  //   // change to 0 0 0 1 3
  //   weightedSearch("", num, {}).then(function (ids) {

  //     var cards = ids.map(function (id, index) {
  //       return (<div key={index} className="col-sm-6 col-md-4 col-lg-3">
  //         <StoryPreview ticketID={id} />
  //       </div>)
  //     });

  //     if (cards.length < num) {
  //       cards.push.apply(cards, self.generateCard(num - cards.length, '1'));
  //     }

  //     self.setState({ recommendedCards: cards });
  //   })
  // }

  generateRecentCards(num) {
    weightedSearch('', num, { dateEdited: 1 }, ids => {
      let recentCards = ids.map(id => this.generateCard(id));
      this.setState({ recentCards });
    });
  }

  render() {
    return (
      <Container className="homepage">
        {/* <div className="options"> 
          <NewProblemButton />
          <GetRandomTicketButton buttonText="Solve a Problem"/>
        </div>  */}
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
