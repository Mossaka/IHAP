import React from 'react';
import SearchPreview from './SearchPreview';
import UserPreview from './UserPreview';
import FilterButton from './FilterButton';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './SearchPage.css'
import * as global from '../global.js'
import firebase from 'firebase';
import { weightedSearch } from './SearchTicket';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      cards: [],
      keyword: '',
      search: '',
    }
    firebase.auth().onAuthStateChanged(user => {
      if (user) this.setState({ loggedIn: true });
      else this.setState({ loggedIn: false });
    });
  }

  refreshSearch() {
    if (this.props.match.params.keyword !== this.state.keyword || this.props.match.params.type !== this.state.search) {
      var key = this.props.match.params.keyword;
      var searchType = this.props.match.params.type;

      if (searchType === global.TICKETS) {
        this.generateTicketCard(key);
        
      } else {
        this.generateUserCard(key);
      }
      this.setState({
        keyword: key,
        search: searchType
      });
    }
  }

  generateUserCard(keyword) {
    var self = this;
    var ids = [];
    var ref = firebase.database().ref('profiles');
    ref.orderByChild('username_lowercase').startAt(keyword.toLowerCase()).endAt(keyword.toLowerCase()+'\uf8ff').on('child_added', function(snapshot) {
      ids.push(snapshot.key);
    });

    var cards = ids.map(function(id) {
      return <UserPreview userID={id} />
    });
    
    self.setState({ cards: cards});
  }

  generateTicketCard(keyword) {
    var self = this;
    weightedSearch(keyword, 5, {title: 5, content: 2}).then(function(ids) {

      var cards = ids.map(function(id) {
        return <SearchPreview ticketID={id} />
      });

      self.setState({ cards: cards});
    })
  }

  render() {
    this.refreshSearch();

    return (
      <div className='container searchpage'>
        <div className='searchTitle'>
          <h3 className='left'> {this.props.match.params.type === global.TICKETS ? "Ticket" : "User"} Results: {this.props.match.params.keyword}</h3>
          <FilterButton className='right' />
        </div>
        <hr />

        <div className="card-deck">
          {this.state.cards}
        </div>

        <div className="create-ticket" style={{ marginTop: '1rem' }}>
          {this.state.loggedIn ? <Button><Link to="/ticket/new">What's Your Problem</Link></Button>
            : <Button>Sign In to Post</Button>}
        </div>
      </div>
    );
  }
}

export default SearchPage;