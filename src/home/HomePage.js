import React from 'react';
import StoryPreview from './StoryPreview';

class HomePage extends React.Component {

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

  render() {
    return (
      <div className='container'>
        <h2 className='my-5' style={{'text-align': 'center'}}>Top Stories</h2>
        <hr />
        <div className="row">
          {this.generateCard(4, '1')}
        </div>
        <h2 className='my-3' style={{'text-align': 'center'}}>For you</h2>
        <hr />
        
        <div className='row'>
          {this.generateCard(8, '2')}
        </div>
        <h2 className="my-3" style={{'text-align': 'center'}}>Recent Stories</h2>
        <hr />

        <div className='row'>
          {this.generateCard(12, '1')}
        </div>
      </div>
    );
  }
}

export default HomePage;
