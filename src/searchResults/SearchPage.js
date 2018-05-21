import React from 'react';
import SearchPreview from './SearchPreview';
import FilterButton from './FilterButton';
import { Button, Col, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import './SearchPage.css'
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
      <div className='container searchpage'>
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

        <div className="create-ticket" style={{marginTop: '1rem'}}>
          <Button color='warning'>Create Ticket</Button>
        </div>
      </div>
    );
  }
}

export default SearchPage;