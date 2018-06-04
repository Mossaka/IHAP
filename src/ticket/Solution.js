import React from 'react';
import firebase from 'firebase';
import { Card, CardBody, CardText, FormGroup, Label, Input, Button, Row, Col, CardTitle, CardSubtitle } from 'reactstrap';
import TimeDisplay from '../common/TimeDisplay';
import Vote from './Vote';
import Avatar from '../common/Avatar';
import EditSolution from './EditSolution';
import EditButton from './EditButton';
import ReactModal from 'react-modal';
import './Solution.css';

ReactModal.setAppElement('#root')
export default class Solution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      loaded: false,
      showAnswerForm: false,
      comment: '',
      comments: [],
      name: ''
    };
  }

  handleSubmit = () => {
    let now = new Date().getTime();
    let userId = firebase.auth().currentUser.uid;
    let newData = {
      content: this.state.comment,
      creator: userId,
      dateEdited: now
    }
    let y = firebase.database().ref('comments').push(newData).getKey();
    firebase.database().ref('solutions/' + this.props.id + '/comments').push(y);
    this.handleCloseModal();
    this.refresh();
    this.setState({ comment: '' })
  }
  handleCommentChange(e) {
    this.setState({ comment: e.target.value });
  }
  componentDidMount() {
    let init = [];
    firebase.database().ref('solutions/' + this.props.id).once('value', s => {
      this.setState({ ...s.val(), loaded: true });
      let comments = s.val().comments;
      for (let comment in comments) {
        firebase.database().ref('comments/' + comments[comment]).once('value', s => {
          let name = s.val().creator;
          firebase.database().ref("profiles/" + name + "/username").once('value', t => {
            var data = {
              content: s.val().content,
              creator: t.val(),
              dateEdited: s.val().dateEdited
            }
            init.push(data);
            this.setState({ comments: init });
          });
        });
      }
    });
  }


  refresh() {
    let init = [];
    firebase.database().ref('solutions/' + this.props.id).once('value', s => {
      this.setState({ ...s.val(), loaded: true });
      let comments = s.val().comments;
      for (let comment in comments) {
        firebase.database().ref('comments/' + comments[comment]).once('value', s => {
          let name = s.val().creator;
          firebase.database().ref("profiles/" + name + "/username").once('value', t => {
            var data = {
              content: s.val().content,
              creator: t.val(),
              dateEdited: s.val().dateEdited
            }
            init.push(data);
            this.setState({ comments: init });
          });
        });
      }
    });
  }
  toggleEditor = () => {
    this.setState({ edit: !this.state.edit });
  }
  handleOpenModal = () => {
    this.setState({ showAnswerForm: true });
    console.log(this.state.comments);
  }
  handleCloseModal = () => {
    this.setState({ showAnswerForm: false });
  }

  render() {
    const Test = ({ comments }) => (
      <div className="comments">
        {Object.keys(comments).map((comment, idx) => (
          <div key={idx}>
            <span className="name">{comments[comment].creator}</span>
            <TimeDisplay time={comments[comment].dateEdited} prefix="commented on: " />
            <p>{comments[comment].content}</p>
          </div>
        ))}
      </div>
    );

    if (!this.state.loaded) {
      return <h1>Loading...</h1>;
    }

    if (this.state.edit) {
      return <EditSolution cancel={this.toggleEditor} preload={this.state} id={this.props.id} />;
    }

    return (
      <Card className="solution">
        <CardBody>
          <Row>
            <Col>
              <Avatar id={this.state.creator} isAnonymous={false} />
            </Col>
            <Col>
              <EditButton id={this.state.creator} onClick={this.toggleEditor} />
            </Col>
          </Row>
        </CardBody>
        <CardBody>
          <CardText dangerouslySetInnerHTML={{ __html: this.state.content }} />
          <TimeDisplay time={this.state.dateEdited} />
        </CardBody>
        <div className="clearfix bottom" style={{ display: 'inline-block' }}>
          <div className="float-left"> <Vote up={this.state.upvote} down={this.state.downvote} path={'solutions/' + this.props.id} ></Vote></div>
          <Button className="float-right" color="info" onClick={this.handleOpenModal} size="sm">comment</Button>
        </div>
        <ReactModal isOpen={this.state.showAnswerForm}>
          <Avatar id={this.state.creator} isAnonymous={false} />
          <p dangerouslySetInnerHTML={{ __html: this.state.content }} />
          <FormGroup>
            <Label >Comment</Label>
            <Input type="textarea" value={this.state.comment} onChange={evt => this.handleCommentChange(evt)} />
          </FormGroup>
          <div>
            <Button className="float-left" color="danger" onClick={this.handleCloseModal}> Close </Button>
            <Button className="float-right" color="primary" onClick={this.handleSubmit} > Submit </Button>
          </div>
        </ReactModal>
        <hr />
        <Test comments={this.state.comments} > </Test>
      </Card>
    );
  }
}