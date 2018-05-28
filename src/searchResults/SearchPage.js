import React from 'react';
import SearchPreview from './SearchPreview';
import UserPreview from './UserPreview';
import { Button, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Container } from 'reactstrap';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import './SearchPage.css'
import firebase from 'firebase';
import { weightedSearch } from './SearchTicket';
import FilterButton from './FilterButton';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.proRef = firebase.database().ref('profiles');

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
    this.toNewProblem = this.toNewProblem.bind(this);
    firebase.auth().onAuthStateChanged(user => {
      if (user) this.setState({ loggedIn: true });
      else this.setState({ loggedIn: false });
    });
  }

  refreshSearch() {
    if (this.props.match.params.keyword !== this.state.keyword) {
      var key = this.props.match.params.keyword;

      this.setState({
        keyword: key,
        ticketCards: [],
        userCards: []
      });

      this.generateTicketCard(key);

      this.generateUserCard(key);
    }
  }

  toggleTab(tab) {
    if(this.state.show !== tab) {
      this.setState({
        show: tab
      });
    }
  }


  generateUserCard(keyword) {
    var self = this;
    var cards = [];
    this.proRef.off();
    this.proRef.orderByChild('username_lowercase').startAt(keyword.toLowerCase()).endAt(keyword.toLowerCase()+'\uf8ff').on('child_added', function (snapshot) {
      cards.push(<UserPreview userID={snapshot.key} />);
      self.setState({userCards: cards});
    });
  }

  generateTicketCard(keyword) {
    var self = this;
    weightedSearch(keyword, 5, {title: 5, content: 2}).then(function(ids) {

      var cards = ids.map(function(id) {
        return <div className='container'><SearchPreview ticketID={id} /></div>
      });

      self.setState({ ticketCards: cards});
    });
  }

  toNewProblem() {
    this.props.history.push('/ticket/new');
  }

  render() {
    this.refreshSearch();

    return (
      <Container className="container">
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
                  <div className='buttonContainer'>
                    {this.state.loggedIn ? 
                    <Button className='button' onClick={this.toNewProblem} color='steelblue'>
                      <span>Post Your Problem here</span>
                    </Button>
                    : <Button className='button' color='steelblue'>
                      <span>Sign In to Post</span>
                    </Button>}
                  </div>
                  <div className='searchpage'>
                    {this.state.ticketCards}
                  </div>
                  
                </TabPane>
                <TabPane tabId='2'>
                  <div className='searchpage'>
                    {this.state.userCards}
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