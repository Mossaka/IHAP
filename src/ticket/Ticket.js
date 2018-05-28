import React from 'react';
import firebase from 'firebase';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import TimeDisplay from '../common/TimeDisplay';
import Vote from './Vote';
import Avatar from '../common/Avatar';
import EditTicket from './EditTicket';

export default class Ticket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevID: this.props.id
    }
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

    firebase.database().ref('tickets/' + this.props.id).once('value').then(t => {
      
      this.setState({ ...t.val() });
      this.props.gotSolution(t.val().solutions);

      firebase.auth().onAuthStateChanged(user => {
        if (user && user.uid === t.val().creator)
          this.setState({ editable: true });
        else
          this.setState({ editable: false });
      });
    });
  }

  componentWillReceiveProps(newProps) {
    if(this.state.prevID !== newProps.id) {
      this.setState({
        prevID: newProps.id
      });
      firebase.database().ref('tickets/' + newProps.id).once('value').then(t => {
    
        this.setState({ ...t.val() });
        this.props.gotSolution(t.val().solutions);

        firebase.auth().onAuthStateChanged(user => {
          if (user && user.uid === t.val().creator)
            this.setState({ editable: true });
          else
            this.setState({ editable: false });
        });
      });
    }
    
  }

  edit = () => {
    this.setState({ edit: !this.state.edit });
  }

  render() {
    if (!this.state) {
      return (
        <h1>Loading...</h1>
      );
    }

    if (this.state.edit) {
      
      let preload = {
        title: this.state.title,
        content: this.state.content,
        image: this.state.image,
        anonymous: this.state.anonymous
      };

      return (
        <EditTicket cancel={this.edit} preload={preload} id={this.props.id}/>
      );
    }

    return (
      <Card>
        <CardBody>
          <CardTitle>{this.state.title}</CardTitle>
        </CardBody>
        <img width="100%" src={this.state.image} alt="ticket thumbnail" />
        <CardBody>
          <CardText dangerouslySetInnerHTML={{ __html: this.state.content }}></CardText>
          Last Edit: <TimeDisplay time={this.state.dateEdited} />
        </CardBody>
        <Vote up={this.state.upvote} down={this.state.downvote} path={'tickets/' + this.props.id}  />
        {!this.state.anonymous && <Avatar id={this.state.creator} />}
        {this.state.editable && <Button onClick={this.edit}>Edit</Button>}
      </Card>
    );
  }
}