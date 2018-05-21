import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import { Row, Col,Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

export default class Content extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
         contentText : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
         upvote: 0,
         downvote: 0,
      }
      this.handleClick = this.handleClick.bind(this);
      this.handleUpVote = this.handleUpVote.bind(this);
      this.handleDownVote = this.handleDownVote.bind(this);

  }
   handleClick(){
   alert("text")
  }
  handleUpVote(){
    let newUpVote = this.state.upvote +1;
    this.setState({
      upvote : newUpVote
    });
  }
  handleDownVote(){
    let newdownvote = this.state.downvote +1;
    this.setState({
          downvote : newdownvote
        });
  }
  render() {
   return(
      <div>
      <Card>
        <CardBody>
          <CardTitle>Content</CardTitle>
          <CardText> { this.state.contentText } </CardText>
          <div class="d-flex bd-highlight mb-4">
            <div className="p-2 bd-highlight" onClick = {this.handleUpVote} ><i className="far fa-arrow-alt-circle-up"></i> </div>
            <div className="p-2 bd-highlight"><p> {this.state.upvote} / {this.state.downvote}</p></div>
            <div className="p-2 bd-highlight" onClick = {this.handleDownVote}><i className="far fa-arrow-alt-circle-down"></i></div>
            <div className="ml-auto p-2 bd-highlight"><p onClick = {this.handleClick}> Comment</p></div>
         </div>

        </CardBody>
      </Card>
    </div>
   );
  }
}