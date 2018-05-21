import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import avatar from '../assets/img_avatar.png';
import { Button, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Container } from 'reactstrap';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import classnames from 'classnames';
import TicketBar from './TicketBar';
import UserBar from './UserBar';
import './ProfilePage.css';

export default class ProfilePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.toggle = this.toggle.bind(this);
    this.toggleUserTab = this.toggleUserTab.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.state = {
      activeTab: '1',
      userTab: '1',
      dropdownOpen: false
    };
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


  render() {
    return (
        <Container>
          <Row>
            <Col xs='3'>
              <div id="user">
                <img id="user_image" src={avatar} style={{width: '70px'}} alt="Avatar" />
                <p className="username" style={{fontSize: '25px', float:'left'}}>username</p>
              </div>
            </Col>
            <Col xs='auto'>
              <div className="info">
                <Nav>
                  <NavItem>
                    <NavLink href='#'>Email</NavLink>
                  </NavItem>
                  <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                    <DropdownToggle nav caret>Bio</DropdownToggle>
                    <DropdownMenu>
                      <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
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
          <Row>
            <Col xs='8'>
              <div id="tabs">
                <Nav tabs>
                  <NavItem>
                    <NavLink className={classnames({active:this.state.activeTab === '1'})} onClick={() => {this.toggle('1')}}>
                      Problem
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
                    <TicketBar />
                    <TicketBar />
                    <TicketBar />
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
                    <TicketBar />
                    <TicketBar />
                    <TicketBar />
                    <TicketBar />
                    <TicketBar />
                    <TicketBar />
                    <TicketBar />
                  </TabPane>
                  <TabPane tabId='5'>
                    <TicketBar />
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
                    <UserBar />
                    <UserBar />
                    <UserBar />
                    <UserBar />
                    <UserBar />
                  </TabPane>
                  <TabPane tabId='2'>
                    <UserBar />
                    <UserBar />
                  </TabPane>
                </TabContent>
              </div>
            </Col>
          </Row>
        </Container>
    );
  }
}