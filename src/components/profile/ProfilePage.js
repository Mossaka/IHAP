import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import avatar from '../../assets/img_avatar.png';
import { Button, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import TicketBar from './TicketBar';
import UserBar from './UserBar';

export default class ProfilePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.toggle = this.toggle.bind(this);
    this.toggleUserTab = this.toggleUserTab.bind(this);
    this.state = {
      activeTab: '1',
      userTab: '1'
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

  render() {
    return (
        <div>
          <div>
            <Row>
              <Col>
                <img className="avatar" src={avatar} style={{width: '70px'}} alt="Avatar" />
                <p className='w-60 pt-3 mb-0 ml-1' style={{fontSize: '15px', float:'left'}}>username</p>
                <Button color={"primary"}>Follow</Button>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col xs='8'>
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
                  </TabPane>
                  <TabPane tabId='2'>
                    <TicketBar />
                  </TabPane>
                  <TabPane tabId='3'>
                    <TicketBar />
                  </TabPane>
                  <TabPane tabId='4'>
                    <TicketBar />
                  </TabPane>
                  <TabPane tabId='5'>
                    <TicketBar />
                  </TabPane>
                </TabContent>
              </Col>
              <Col xs='4'>
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
                  </TabPane>
                  <TabPane tabId='2'>
                    <UserBar />
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </div>
        </div>
    );
  }
}