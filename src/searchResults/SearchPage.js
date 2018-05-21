import React from 'react';
import SearchPreview from './SearchPreview';
import FilterButton from './FilterButton';
import { Button, Col, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import './SearchPreview.css'
import * as global from '../global.js'

class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchType: this.props.match.params.type == global.TICKETS ? "Ticket" : "User" ,
    }
    
  }

  render() {
    return (
      <div className='container'>
        <div className = 'searchTitle'>
          <h3 className = 'left'> {this.state.searchType} Results: {this.props.match.params.keyword}</h3>
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