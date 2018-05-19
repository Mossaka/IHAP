import React from 'react';
import {Link} from 'react-router';
import StoryPreview from './StoryPreview';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  generateCard(num) {
    var a = []
    for(let i = 0; i < num; i++) {
      a.push((
        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3">
          <StoryPreview />
        </div>
      ))
    }
    return a;
  }

  render() {
    return (
      <div className='container'>
        <h3 className='my-5'>Top Stories</h3>
        <hr/>
        <div className = "row">
          { this.generateCard(12) }
        </div>
      </div>
    );
  }
}

export default HomePage;
