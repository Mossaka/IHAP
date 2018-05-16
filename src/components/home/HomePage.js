import React from 'react';
import {Link} from 'react-router';
import StoryPreview from './StoryPreview';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container'>
        <h3 className='my-5'>Top Stories</h3>
        <hr/>
        <div className="card-deck">
          <StoryPreview />
          <StoryPreview />
          <StoryPreview />
          <StoryPreview />
          <StoryPreview />
          <StoryPreview />
          <StoryPreview />
          <StoryPreview />
          <StoryPreview />
          <StoryPreview />
          <StoryPreview />
          <StoryPreview />
          <StoryPreview />
          <StoryPreview />
          <StoryPreview />
          <StoryPreview />
          <StoryPreview />
          <StoryPreview />
          <StoryPreview />
          <StoryPreview />
        </div>
      </div>
    );
  }
}

export default HomePage;
