import React from 'react';
import SearchPreview from './SearchPreview';
import UserPreview from './UserPreview';
import { Button, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Container } from 'reactstrap';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import './SearchPage.css'
import firebase from 'firebase';
import { weightedSearch } from './SearchTicket';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      ticketCards: [],
      userCards: [],
      keyword: '',
      show: '1',
    };
    this.toggleTab = this.toggleTab.bind(this);
    this.refreshSearch = this.refreshSearch.bind(this);
    this.generateTicketCard = this.generateTicketCard.bind(this);
    this.generateUserCard = this.generateUserCard.bind(this);
    firebase.auth().onAuthStateChanged(user => {
      if (user) this.setState({ loggedIn: true });
      else this.setState({ loggedIn: false });
    });
  }

  refreshSearch() {
    if (this.props.match.params.keyword !== this.state.keyword) {
      var key = this.props.match.params.keyword;

      this.setState({
        ticketCards: [],
        userCards: []
      });

      this.generateTicketCard(key);

      this.generateUserCard(key);

      this.setState({
        keyword: key,
      });
    }
  }

  /*
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
*/


  toggleTab(tab) {
    if(this.state.show !== tab) {
      this.setState({
        show: tab
      });
    }
  }


  generateUserCard(keyword) {
    var ids = [];
    var ref = firebase.database().ref('profiles');
    //startAt(keyword.toLowerCase()).endAt(keyword.toLowerCase()+'\uf8ff')
    ref.orderByChild('username_lowercase').on('child_added', function(snapshot) {
      ids.push(snapshot.key);
    });

    var cards = ids.map(function(id) {
      return <UserPreview userID={id} />
    });
    
    this.setState({ userCards: cards});
  }

  generateTicketCard(keyword) {
    var self = this;
    weightedSearch(keyword, 5, {title: 5, content: 2}).then(function(ids) {

      var cards = ids.map(function(id) {
        return <SearchPreview ticketID={id} />
      });

      self.setState({ ticketCards: cards});
    });
  }

  render() {
    this.refreshSearch();

    return (
      
      <Container>
        <div className='searchTitle'>
          <h3 className='left'> {this.props.match.params.type === global.TICKETS ? "Ticket" : "User"} Results: {this.props.match.params.keyword}</h3>
          <FilterButton className='right' />
        </div>
        <Row>
          <Col>
            <div id="tabs">
              <Nav tabs>
                <NavItem>
                  <NavLink className={classnames({active:this.state.show === '1'})} onClick={() => {this.toggleTab('1')}}>
                    Tickets
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className={classnames({active:this.state.show === '2'})} onClick={() => {this.toggleTab('2')}}>
                    Users
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.show}>
                <TabPane tabId='1'>
                  <div className='container searchpage'>
                    <div className="card-deck">
                      {this.state.ticketCards}
                    </div>

                    <div className="create-ticket" style={{ marginTop: '1rem' }}>
                      {this.state.loggedIn ? <Button><Link to="/ticket/new">What's Your Problem</Link></Button>
                          : <Button>Sign In to Post</Button>}
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId='2'>
                  <div className='container searchpage'>
                    <div className="card-deck">
                      {this.state.userCards}
                    </div>
                  </div>
                </TabPane>
              </TabContent>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

}

export default SearchPage;