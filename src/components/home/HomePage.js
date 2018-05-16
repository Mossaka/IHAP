import React from 'react';
import {Link} from 'react-router';
import StoryPreview from './StoryPreview';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1>HomePage</h1>
        <StoryPreview />
      </div>
    );
  }
}

export default HomePage;
