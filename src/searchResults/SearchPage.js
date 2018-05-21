import React from 'react';
import SearchPreview from './SearchPreview';
import FilterButton from './FilterButton';
import { Button, Col, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import './SearchPreview.css'

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container'>
        <div className = 'searchTitle'>
          <h3 className = 'left'> Search Results </h3>
          <FilterButton className = 'right'/>
        </div>
        <hr/>
        
        <div className="card-deck">
          <SearchPreview />
          <SearchPreview />
          <SearchPreview />
          <SearchPreview />
        </div>
      </div>
    );
  }
}

export default SearchPage;