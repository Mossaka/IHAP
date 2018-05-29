import React from 'react';
import avatar from '../assets/img_avatar.png';
import { Button, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Container } from 'reactstrap';
import {Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import classnames from 'classnames';
import TicketBar from './TicketBar';
import UserBar from './UserBar';
import SolutionBar from './SolutionBar';
import './ProfilePage.css';
import ProfileSettingPage from './ProfileSettingPage';
import firebase from 'firebase';
import download from '../assets/download.jpg';
import parse from '../assets/parse.jpg';
import edit from '../assets/eidt.jpg';
import TicketPreview from './TicketPreview';

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
      firstname: ' ',
      lastname: ' ',
      username: ' ',
      biography: "Loading",
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
      // console.log(snapshot.val())
      this.setState({
        ...snapshot.val()
      })
      console.log(this.state)
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
        {Object.keys(ticketList).map((key,index) => 
            <div className='container' key={index}>
              <TicketPreview  ticketID={ticketList[key]} />
            </div>
          
        )}
      </div>
    )
  }

  generateSolutionBarGivenSolutionList(solutionList) {
    return (
      <div>
        {Object.keys(solutionList).map((key,index) => 
          <div className='container' key={index}>
            <TicketPreview  solutionID={solutionList[key]} />
          </div>
        )}
      </div>
    )
  }

  // haven't used it yet
  generateUserBarGivenUserList(userList) {
    return (
      <div>
        {Object.keys(userList).map((key,index) => 
          <UserBar key={index} uid={userList[key]} />
        )}
      </div>
    )
  }

  renderUserInfo() {
    return (
      <div className='user-info'>
        <Row xs="8">
          <Col xs='auto'>
            <div id="user">
              <div id="avatar" style={{backgroundImage: `URL(${this.state.avatar})`, width:'100px', height:'100px'}}></div>
              <p className="username" style={{fontSize: '25px', float:'left'}}>{this.state.username}</p>
            </div>
          </Col>
          <Col xs='auto'>
            <div className="info float-left">
              <Nav>
                <Row>
                <NavItem>
                  <NavLink href='#'><img src={download} style={{width:'25px', height:'25px'}} alt="email"/>  {this.state.email}</NavLink>
                </NavItem>
                </Row>
                <Row>
                <NavItem>
                  <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                    <DropdownToggle nav caret><img src={parse} style={{width:'25px', height:'25px'}} alt="drop down" />  </DropdownToggle>
                    <DropdownMenu>
                      <p>{this.state.bio}</p>
                    </DropdownMenu>
                  </Dropdown>
                </NavItem>
                <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                  <DropdownToggle nav caret>Bio</DropdownToggle>
                  <DropdownMenu>
                    <p>{this.state.biography}</p>
                  </DropdownMenu>
                </Dropdown>
                </Row>
              </Nav>
            </div>  
          </Col>
          <Col>
            <div id="follow" className='float-right' style={{bottom:'0', float:'right'}}>
              {this.state.currentUser ? <Button size='sm' style={{backgroundColor:'white', borderColor:'white'}} onClick={this.toggleSetting}><img src={edit} style={{width:'30px', height:'30px'}} alt="edit" /> </Button> : <div></div>}
              {this.state.currentUser ? <div></div> : <Button color={"primary"} style={{float:'left'}} size="sm">Follow</Button>}
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
                      {this.generateSolutionBarGivenSolutionList(this.state.solutions)}
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