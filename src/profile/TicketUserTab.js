import React from 'react';
import {Nav, NavItem, NavLink, TabContent, TabPane, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import TicketPreview from './TicketPreview';
import UserBar from './UserBar';


export default class TicketUserTab extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      activeTab: '1',
      userTab: '1',
      tickets: [],
      solutions: [],
      bookmarked: [],
      followedUsers: [],
      followingUsers: [],
    }

    this.toggle = this.toggle.bind(this)
    this.toggleUserTab = this.toggleUserTab.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps })
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  toggleUserTab(tab) {
    if (this.state.userTab !== tab) {
      this.setState({
        userTab: tab
      });
    }
  }

  generateTicketBarGivenTicketList(ticketList) {
    return (
      <div>
        {Object.keys(ticketList).map((key, index) =>
          <div className='pt-3' key={index}>
            <TicketPreview ticketID={ticketList[key]} />
          </div>
        )}
      </div>
    )
  }

  generateSolutionBarGivenSolutionList(solutionList) {
    return (
      <div>
        {Object.keys(solutionList).map((key,index) => 
          <div className='pt-3' key={index}>
            <TicketPreview  solutionID={solutionList[key]} />
          </div>
        )}
      </div>
    )
  }

  generateUserBarGivenUserList(userList) {
    return (
      <div>
        {Object.keys(userList).map((key, index) =>
          <div className='pt-3' key={index}>
            <UserBar uid={userList[key]} handleUnfollow={this.handleUnfollow} currentUser={this.state.currentUser} />
          </div>
        )}
      </div>
    )
  }

  render() {
    return (
      <Row>
        <Col xs='8'>
          <div id="tabs">
            <Nav tabs>
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1') }}>
                  Ticket
                      </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2') }}>
                  Solution
                      </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggle('3') }}>
                  Bookmark
                      </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId='1'>
                {/* here is a problem */}
                {this.generateTicketBarGivenTicketList(this.state.tickets)}
              </TabPane>
              <TabPane tabId='2'>
                {this.generateSolutionBarGivenSolutionList(this.state.solutions)}
              </TabPane>
              <TabPane tabId='3'>
                {this.generateTicketBarGivenTicketList(this.state.bookmarked)}
              </TabPane>
            </TabContent>
          </div>
        </Col>
        <Col xs='4'>
          <div id="tabs">
            <Nav tabs>
              <NavItem>
                <NavLink className={classnames({ active: this.state.userTab === '1' })} onClick={() => { this.toggleUserTab('1') }}>
                  Following
                      </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: this.state.userTab === '2' })} onClick={() => { this.toggleUserTab('2') }}>
                  Follower
                      </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.userTab}>
              <TabPane tabId='1'>
                {this.generateUserBarGivenUserList(this.state.followingUsers)}
              </TabPane>
              <TabPane tabId='2'>
                {this.generateUserBarGivenUserList(this.state.followedUsers)}
              </TabPane>
            </TabContent>
          </div>
        </Col>
      </Row>
    );
  }
}

TicketUserTab.PropTypes = {
  followingUsers: PropTypes.array,
  followedUsers: PropTypes.array,
  tickets: PropTypes.array,
  solutions: PropTypes.array,
  Bookmarked: PropTypes.array,
}