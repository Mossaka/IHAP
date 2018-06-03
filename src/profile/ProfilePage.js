import React from 'react';
import avatar from '../assets/anonymous-avatar.jpg';
import { Button, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Container } from 'reactstrap';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import classnames from 'classnames';
import UserBar from './UserBar';
import './ProfilePage.css';
import ProfileSettingPage from './ProfileSettingPage';
import firebase from 'firebase';
import TicketPreview from './TicketPreview';
import FollowButton from './FollowButton'
import * as FontAwesome from 'react-icons/lib/fa';
import UnfollowButton from './UnfollowButton'
import EditButton from './EditButton'

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
      email: 'No email',
      firstname: ' ',
      lastname: ' ',
      username: ' ',
      biography: "Loading",
      tickets: [],
      solutions: [],
      bookmarked: [],
      followingUsers: [],
      followedUsers: [],
      currentUser: null,
      followed: false,
      profileUserID: null,
      loginUserID: null,
    };

    this.toggleSetting = this.toggleSetting.bind(this)
    this.retriveData = this.retriveData.bind(this)
    this.checkLoginUser = this.checkLoginUser.bind(this)
    this.toggleButton = this.toggleButton.bind(this)
    this.handleFollow = this.handleFollow.bind(this)
    this.handleUnfollow = this.handleUnfollow.bind(this)
    // this.handleFollow = this.handleFollow.bind(this)

    const profileUserID = this.props.match.params.id;
    this.checkLoginUser(profileUserID)
  }

  componentWillReceiveProps(nextProps) {
    const profileUserID = nextProps.match.params.id // the user id for current page
    this.setState({
      activeTab: '1',
      userTab: '1',
      dropdownOpen: false,
      setting: false,
      avatar: avatar,
      email: 'No email',
      firstname: ' ',
      lastname: ' ',
      username: ' ',
      biography: "Loading",
      tickets: [],
      solutions: [],
      bookmarked: [],
      followingUsers: [],
      followedUsers: [],
      currentUser: null,
      followed: false,
      profileUserID: null,
      loginUserID: null,
      notsignin: false,
    })

    this.checkLoginUser(profileUserID);
  }

  checkLoginUser(profileUserID) {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        if(user.uid === profileUserID) { // the profile page is login user's profile
          this.setState({currentUser: true, profileUserID: user.uid, loginUserID: user.uid})
          this.retriveData(user.uid);
        } else {
          this.setState({currentUser: false, profileUserID: profileUserID, loginUserID: user.uid})
          firebase.database().ref('networks/' + user.uid + '/followingUsers/').once('value').then(snapshot => {
              if (snapshot.exists())
                  snapshot.forEach(child => {
                      if (child.val() === profileUserID) {
                          this.setState({ followed: true });
                      }
                  });
          });
          this.retriveData(profileUserID);
          
        }
      } else {
        this.setState({notsignin: true})
      }
    })
  }

  retriveData(uid) {
    console.log('here')
    firebase.database().ref('profiles/' + uid).once('value').then(snapshot => {
      const profiles = {...snapshot.val()};
      firebase.database().ref('networks/' + uid).once('value').then(snapshot => {
        const networks = {...snapshot.val()};
        firebase.database().ref('notebooks/' + uid).once('value').then(snapshot => {
          const notebooks = {...snapshot.val()};
          this.setState({...networks, ...profiles, ...notebooks})
        })
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
            <div className='pt-3' key={index}>
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
        {Object.keys(userList).map((key,index) => 
          <div className='pt-3' key={index}>
            <UserBar uid={userList[key]} handleUnfollow={this.handleUnfollow}/>
          </div>
        )}
      </div>
    )
  }

  handleFollow(e) {
    e.preventDefault();
    e.stopPropagation(); 
    const db = firebase.database();
    
    db.ref('networks/' + this.state.loginUserID + '/followingUsers/').push(this.state.profileUserID, error => {
        if (error)
            alert('Error has occured during saving process')
        else
            db.ref('networks/' + this.state.profileUserID + '/followedUsers/').push(this.state.loginUserID, error => {
            if (error)
                alert('Error has occured during saving process')
            else {
                this.setState({followed: true})
              }
            })
    })
  }

  handleUnfollow(e, unfollowID=null) {

    e.preventDefault();
    e.stopPropagation();
    const db = firebase.database();
    
    db.ref('networks/' + this.state.loginUserID + '/followingUsers/').orderByKey().once('value').then(snapshot => {
      snapshot.forEach(child => {
          if(child.val() === (unfollowID ? unfollowID : this.state.profileUserID)) {
              child.ref.remove(err => {
                  if(err) alert("error has occured during unfollowing this user")
                  else 
                    db.ref('networks/' + (unfollowID ? unfollowID : this.state.profileUserID) + '/followedUsers/').once('value').then(snapshot => {
                        snapshot.forEach(child => {
                            if(child.val() === this.state.loginUserID) {
                                child.ref.remove(err => {
                                    if(err) alert("error has occured during unfollowing this user")
                                    else {
                                        this.setState({followed: false});
                                        if(unfollowID) window.location.reload();
                                        // (unfollowID ? window.location.reload() : this.setState({followed: false}));
                                    }
                                })
                            }
                        })
                    })
              })
          }
      })
    })
  }

  toggleButton() {
    if(this.state.currentUser !== null) { 
      if(this.state.currentUser === true) {
        return <EditButton toggleSetting={this.toggleSetting} />
      } else if(this.state.followed !== null) {
        if(this.state.followed)
          return <UnfollowButton handleUnfollow={this.handleUnfollow} />
        else
          return <FollowButton handleFollow={this.handleFollow}  />
      }
    }
    else {
      return <div>Loading</div>
    }
  }

  renderUserInfo() {
    return (
      <div className='user-info'>
        <Row xs="8">
          <Col xs='3'>
            <div id="user">
              <div id="avatar">
                <img src={this.state.avatar} alt='avatar' />
              </div>
              <div className='row'>
                <a className="username" style={{fontSize: '25px', float:'left'}}>{this.state.username}</a>
                <a className="realname pl-1" style={{fontSize: '20px', float:'left'}}>{this.state.firstname.substr(0,8) + " " + this.state.lastname.substr(0, 8)}</a>
              </div>
            </div>
          </Col>
          <Col xs='auto'>
            <div className="info float-left">
              <Nav>
                <Row>
                  <NavItem>
                    <NavLink>
                    <FontAwesome.FaEnvelope width='25px' height='25px'/>  {this.state.email}</NavLink>
                  </NavItem>
                  <NavLink id='Popover1' onClick={this.toggleDropdown}>
                    <FontAwesome.FaUser width='25px' height='25px' />  <a>Bio</a>
                  </NavLink>
                  <Popover placement='bottom' isOpen={this.state.dropdownOpen} target='Popover1' toggle={this.toggleDropdown}>
                    <PopoverHeader>Biography</PopoverHeader>
                    <PopoverBody>{this.state.biography}</PopoverBody>
                  </Popover>
                  <NavItem>
                    <NavLink> <FontAwesome.FaBriefcase  width='25px' height='25px' />  {this.state.title ? this.state.title.substring(0,10) : 'Awesome Human'}</NavLink>
                  </NavItem>
                </Row>
              </Nav>
            </div>  
          </Col>
          <Col>
            <div id="follow" className='float-right' style={{bottom:'0', float:'right'}}>
                {this.toggleButton()}
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