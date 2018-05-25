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
      cards: []
    }
    firebase.auth().onAuthStateChanged(user => {
      if (user) this.setState({ loggedIn: true });
      else this.setState({ loggedIn: false });
    });

    //this.componentDidMount = this.componentDidMount.bind();
  }

  componentDidMount() {
    var self = this;
    var keyword = this.props.match.params.keyword;
    if (this.props.match.params.type === global.TICKETS) {
      //generateTicketCard(this.props.match.params.keyword);
        
      weightedSearch(keyword, 5, 2, 1, 0, 0, 0).then(function(ids) {

        var cards = ids.map(function(id) {
          return <SearchPreview ticketID={id} />
        });

        console.log(cards);

        self.setState({ cards: cards});
      })

    } else {
      //generateUserCard(this.props.match.params.keyword);

        
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
      
      this.setState({ cards: cards});


    }
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
    
    this.setState({ cards: cards});
  }

  generateTicketCard(keyword) {
    weightedSearch(keyword, 5, 0, 0, 1, 0, 0).then(function(ids) {

      var cards = ids.map(function(id) {
        return <SearchPreview ticketID={id} />
      });

      this.setState({ cards: cards});
    })
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