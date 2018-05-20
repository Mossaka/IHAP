import React from 'react';
import SearchPreview from './SearchPreview';
import FilterButton from './FilterButton';
import { Button, Col, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../styles/SearchPreview.css'

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container'>
        
        <div className = 'titleBox'>
          <div className = 'textbox'>
            <h3> Search Results </h3>
          </div>
          <div claddName = 'userbox'>
            <FilterButton width='16' height='' style={{float:'right'}}/>
          </div>
          
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