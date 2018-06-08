import React from 'react';
import SearchPreview from './SearchPreview';
import UserPreview from './UserPreview';
import { Button, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Container } from 'reactstrap';
import './SearchPage.css'
import firebase from 'firebase';
import { weightedSearch } from '../utils/search';
import NewProblemButton from '../common/NewProblemButton';

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.proRef = firebase.database().ref('profiles');
    this.state = {
      tickets: [],
      users: [],
      keyword: '',
      show: '1',
    };
  }

  componentDidMount() {
    this.search(this.props.match.params.keyword);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.match.params.keyword !== nextProps.match.params.keyword) {
      this.search(nextProps.match.params.keyword);
      return false;
    }
    return true;
  }

  search(keyword) {
    this.searchUser(keyword);
    this.searchTicket(keyword);
  }

  searchUser(keyword) {
    let users = [];
    keyword = keyword.toLowerCase();
    this.proRef.orderByChild('username_lowercase')
      .startAt(keyword)
      .endAt(keyword + '\uf8ff')
      .once('value', snapshot => {
        for (let id in snapshot.val()) {
          users.push({ id, bio: snapshot.val()[id].biography });
        }
        this.setState({ users });
      });
  }

  searchTicket(keyword) {
    weightedSearch(keyword, 5, { title: 5, content: 2 }, ids => {
      this.setState({ tickets: ids });
    });
  }

  toggleTab = tab => {
    if (this.state.show !== tab) {
      this.setState({ show: tab });
    }
  }


  render() {
    return (
      <Container className="search-page">
        
        <Row>
          <Col xs={{ size: '9', offset: '1' }}>
          <div className="title">
            <h3>Search Results of: {this.props.match.params.keyword}</h3>
          </div>
            <Nav tabs>
              <NavItem>
                <NavLink className={`${this.state.show === '1' ? 'active' : ''}`} onClick={() => this.toggleTab('1')}>Tickets</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={`${this.state.show === '2' ? 'active' : ''}`} onClick={() => this.toggleTab('2')}>Users</NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.show}>
              <TabPane tabId="1">
                {this.state.tickets.map(id => <SearchPreview id={id} key={id} />)}
                <NewProblemButton />
              </TabPane>
              <TabPane tabId="2">
                {this.state.users.map(user => <UserPreview user={user} key={user.id} />)}
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </Container>
    );
  }
}
