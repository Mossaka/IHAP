import React from 'react';
import firebase from 'firebase';
import { Row, Col,Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import TimeDisplay from '../common/TimeDisplay';
import Vote from './Vote';
import Avatar from '../common/Avatar';
import EditTicket from './EditTicket';
import Bookmark from '../common/Bookmark';

export default class Ticket extends React.Component {
  constructor(props) {
    super(props);
    //this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

    firebase.database().ref('tickets/' + this.props.id).once('value').then(t => {
      this.setState({ ...t.val() });
      this.props.gotSolution(t.val().solutions);

      firebase.auth().onAuthStateChanged(user => {
        if (user && user.uid === t.val().creator)
          this.setState({ editable: true });
        else
          this.setState({ editable: false });
      });
      //this.setState({prevID: this.props.id});
      //console.log("ticet page, ticket information fetch from the firebase: " + this.state.upvote);
      //console.log("ticet page, ticket information fetch from the firebase: " + this.state.downvote);

    });
  }

  // componentWillReceiveProps(newProps) {
  //   if(this.state.prevID !== newProps.id) {
  //     this.setState({
  //       prevID: newProps.id
  //     });
  //     firebase.database().ref('tickets/' + newProps.id).once('value').then(t => {

  //       this.setState({ ...t.val() });
  //       this.props.gotSolution(t.val().solutions);

  //       firebase.auth().onAuthStateChanged(user => {
  //         if (user && user.uid === t.val().creator)
  //           this.setState({ editable: true });
  //         else
  //           this.setState({ editable: false });
  //       });
  //     });
  //   }

  // }

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
        <Row>
          <Col style={{'padding-left':'5%'}}>
            <Vote up={this.state.upvote} down={this.state.downvote} path={'tickets/' + this.props.id}  />
          </Col>
          <Col style={{'padding-right':'8%'}}>
            <Bookmark id={this.props.id}/>
          </Col>
        </Row>
        {this.state.creator && <Avatar id={this.state.creator} isAnonymous={this.state.anonymous} />}
        {this.state.editable && <Button onClick={this.edit}>Edit</Button>}
      </Card>
    );
  }
}