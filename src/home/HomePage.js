import React from 'react';
import StoryPreview from './StoryPreview';
import { weightedSearch } from '../searchResults/SearchTicket'
import './StoryPreview.css'

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topCards: [],
      recommendedCards: [],
      recentCards: []
    }
  }

  componentWillMount() {
    this.generateTopCards(4);
    this.generateRecommendedCards(8);
    this.generateRecentCards(12);
  }

  generateCard(num, id) {
    let cards = [];
    for (let i = 0; i < num; i++) {
      cards.push(
        <div key={i} className="col-sm-6 col-md-4 col-lg-3">
          <StoryPreview ticketID={id} />
        </div>
      );
    }
    return cards;
  }

  generateTopCards(num) {
    var self = this;
    weightedSearch("", num, {dateEdited: 2, rating:2, upvotes: 1}).then(function(ids) {

      var cards = ids.map(function(id, index) {
        return (<div key={index} className="col-sm-6 col-md-4 col-lg-3">
                  <StoryPreview ticketID={id} />
                </div>)
      });

      if (cards.length < num) {
        cards.push.apply(cards, self.generateCard(num - cards.length, '1'));
      }

      self.setState({ topCards: cards});
    })
  }

  generateRecommendedCards(num) {
    var self = this;
    // change to 0 0 0 1 3
    weightedSearch("", num, {}).then(function(ids) {

      var cards = ids.map(function(id, index) {
        return (<div key={index} className="col-sm-6 col-md-4 col-lg-3">
                  <StoryPreview ticketID={id} />
                </div>)
      });

      if (cards.length < num) {
        cards.push.apply(cards, self.generateCard(num - cards.length, '1'));
      }

      self.setState({ recommendedCards: cards});
    })
  }

  generateRecentCards(num) {
    var self = this;
    weightedSearch("", num, {dateEdited: 1}).then(function(ids) {

      var cards = ids.map(function(id, index) {
        return ( 
        <div key={index} className="col-sm-6 col-md-4 col-lg-3">
          <StoryPreview ticketID={id} />
        </div> )
      });

      if (cards.length < num) {
        cards.push.apply(cards, self.generateCard(num - cards.length, '1'));
      }

      self.setState({ recentCards: cards});
    })
  }

  render() {
    return (
      <div className='homepage-bg'>
      <div className='container' >
        <h1 className='my-5' style={{'text-align': 'center'}}>Top Stories</h1>
        <hr />
        <div className="row">
          {this.state.topCards}
        </div>
        <h1 className='my-3' style={{'text-align': 'center'}}>For you</h1>
        <hr />
        
        <div className='row'>
          {this.state.recommendedCards}
        </div>
        <h1 className="my-3" style={{'text-align': 'center'}}>Recent Stories</h1>
        <hr />

        <div className='row'>
          {this.state.recentCards}
        </div>
      </div>
      </div>
    );
  }
}

export default HomePage;
