import React from 'react';
import StoryPreview from './StoryPreview';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  generateCard(num) {
    let cards = [];
    for (let i = 0; i < num; i++) {
      cards.push(
        <div key={i} className="col-sm-6 col-md-4 col-lg-3">
          <StoryPreview ticketID="1" />
        </div>
      );
    }
    return cards;
  }

  render() {
    return (
      <div className='container'>
        <h3 className='my-5'>Top Stories</h3>
        <hr />
        <div className="row">
          {this.generateCard(12)}
        </div>
      </div>
    );
  }
}

export default HomePage;
