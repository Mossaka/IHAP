import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import avatar from '../assets/img_avatar.png';
import { Button, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Container } from 'reactstrap';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import classnames from 'classnames';
import TicketBar from './TicketBar';
import UserBar from './UserBar';
import './ProfilePage.css';
import ProfileSettingPage from './ProfileSettingPage';
import firebase from 'firebase';

export default class ProfilePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.toggle = this.toggle.bind(this);
    this.toggleUserTab = this.toggleUserTab.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.state = {
      activeTab: '1',
      userTab: '1',
      dropdownOpen: false,
      setting: false,
      avatar: avatar,
      email: 'email',
      firstname: 'Gary',
      lastname: 'Gillespie',
      username: 'gg',
      bio: "Loading",
      tickets: [],
      solutions: [],
      bookmarked: [],
      following: [],
      followingUsers: [],
      followedUsers: [],
      currentUser: false,
      uid: '',
    };

    this.toggleSetting = this.toggleSetting.bind(this)
  }

  componentDidMount() {
    const uid = this.props.match.params.id;

    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        if(user.uid === uid) { // the profile page is login user's profile
          this.setState({currentUser: true, uid: user.uid})
        } else {
          this.setState({currentUser: false, uid: user.uid})
        }
      } else {
        this.setState({currentUser: false})
      }
    })

    firebase.database().ref('profiles/' + uid).once('value').then(snapshot => {
      this.setState({
        ...snapshot.val()
      })
    })

    firebase.database().ref('networks/' + uid).once('value').then(snapshot => {
      this.setState({
        ...snapshot.val()
      })
    })

    firebase.database().ref('notebooks/' + uid).once('value').then(snapshot => {
      this.setState({
        ...snapshot.val()
      })
    })

  }

  toggle(tab) {
    if(this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  toggleUserTab(tab) {
    if(this.state.userTab !== tab) {
      this.setState({
        userTab: tab
      });
    }
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleSetting() {
    this.setState({ setting: !this.state.setting });
  }


  generateTicketBarGivenTicketList(ticketList) {
    return (
      <div>
        {Object.keys(ticketList).map(key => 
          <TicketBar ticketID={ticketList[key]} />
        )}
      </div>
    )
  }

  // haven't used it yet
  generateUserBarGivenUserList(userList) {
    return (
      <div>
        {Object.keys(userList).map(key => 
          <UserBar uid={userList[key]} />
        )}
      </div>
    )
  }

  renderUserInfo() {
    return (
      <div className='user-info'>
        <Row>
          <Col xs='3'>
            <div id="user">
              <div id="avatar" style={{backgroundImage: `URL(${this.state.avatar})`, width:'50px', height:'50px'}}></div>
              <p className="username" style={{fontSize: '25px', float:'left'}}>{this.state.username}</p>
              {this.state.currentUser ? <Button size='sm' onClick={this.toggleSetting}>Edit</Button> : <div></div>}
            </div>
          </Col>
          <Col xs='auto'>
            <div className="info">
              <Nav>
                <NavItem>
                  <NavLink href='#'>{this.state.email}</NavLink>
                </NavItem>
                <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                  <DropdownToggle nav caret>Bio</DropdownToggle>
                  <DropdownMenu>
                    <p>{this.state.bio}</p>
                  </DropdownMenu>
                </Dropdown>
              </Nav>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs='3'>
            <div id="follow">
              <Button color={"primary"} style={{float:'left'}} size="sm">Follow</Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  }


  render() {
    if(this.state.setting) {
      return (
        <Container>
          {this.renderUserInfo()}
          <ProfileSettingPage onSubmit={this.toggleSetting} uid={this.state.uid}/>
        </Container>
      )
    } else {
      return (
        <Container>
          {this.renderUserInfo()}
          <Row>
              <Col xs='8'>
                <div id="tabs">
                  <Nav tabs>
                    <NavItem>
                      <NavLink className={classnames({active:this.state.activeTab === '1'})} onClick={() => {this.toggle('1')}}>
                        Ticket
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className={classnames({active:this.state.activeTab === '2'})} onClick={() => {this.toggle('2')}}>
                        Solution
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className={classnames({active:this.state.activeTab === '3'})} onClick={() => {this.toggle('3')}}>
                        Activity
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className={classnames({active:this.state.activeTab === '4'})} onClick={() => {this.toggle('4')}}>
                        Bookmark
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className={classnames({active:this.state.activeTab === '5'})} onClick={() => {this.toggle('5')}}>
                        Following
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId='1'>
                      {this.generateTicketBarGivenTicketList(this.state.tickets)}
                    </TabPane>
                    <TabPane tabId='2'>
                      <TicketBar />
                      <TicketBar />
                    </TabPane>
                    <TabPane tabId='3'>
                      <TicketBar />
                      <TicketBar />
                      <TicketBar />
                      <TicketBar />
                    </TabPane>
                    <TabPane tabId='4'>
                      {this.generateTicketBarGivenTicketList(this.state.bookmarked)}
                    </TabPane>
                    <TabPane tabId='5'>
                      {this.generateTicketBarGivenTicketList(this.state.following)}
                    </TabPane>
                  </TabContent>
                </div>
              </Col>
              <Col xs='4'>
                <div id="tabs">
                  <Nav tabs>
                    <NavItem>
                      <NavLink className={classnames({active:this.state.userTab === '1'})} onClick={() => {this.toggleUserTab('1')}}>
                        Following
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className={classnames({active:this.state.userTab === '2'})} onClick={() => {this.toggleUserTab('2')}}>
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
        </Container>
      )
    }
  }
}