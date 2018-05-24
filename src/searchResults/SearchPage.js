import React from 'react';
import SearchPreview from './SearchPreview';
import UserPreview from './UserPreview';
import FilterButton from './FilterButton';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './SearchPage.css'
import * as global from '../global.js'
import firebase from 'firebase';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    }
    firebase.auth().onAuthStateChanged(user => {
      if (user) this.setState({ loggedIn: true });
      else this.setState({ loggedIn: false });
    });
  }

  generateTicketCard(ids) {
    var cards = ids.map(function(id) {
      return <SearchPreview ticketID={id} />
    });

    return cards;
  }

  generateUserCard(keyword) {
    var ids = [];
    var ref = firebase.database().ref('profiles');
    ref.orderByChild('username').startAt(keyword.toLowerCase()).endAt(keyword.toLowerCase()+'\uf8ff').on('child_added', function(snapshot) {
      ids.push(snapshot.key);
    });
    ref.orderByChild('username').startAt(keyword.toUpperCase()).endAt(keyword.toUpperCase()+'\uf8ff').on('child_added', function(snapshot) {
      ids.push(snapshot.key);
    });

    var cards = ids.map(function(id) {
      return <UserPreview userID={id} />
    });
    return cards;
  }

  searchTicket(keywords) {
    var ref = firebase.database.ref('tickets');
  }

  render() {
    return (
      <div className='container searchpage'>
        <div className='searchTitle'>
          <h3 className='left'> {this.props.match.params.type === global.TICKETS ? "Ticket" : "User"} Results: {this.props.match.params.keyword}</h3>
          <FilterButton className='right' />
        </div>
        <hr />

        <div className="card-deck">
          {this.generateUserCard(this.props.match.params.keyword)}
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