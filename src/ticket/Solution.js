import React from 'react';
import firebase from 'firebase';
import { Card, CardBody, CardText,FormGroup,Label,Input,Button, Row, Col } from 'reactstrap';
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
      showAnswerForm : false
    };
  }

  handleSubmit(){
    alert("submit is clicked");
  }
  componentDidMount() {
    firebase.database().ref('solutions/' + this.props.id).once('value', s => {
      this.setState({ ...s.val(), loaded: true });
    });
  }

  toggleEditor = () => {
    this.setState({ edit: !this.state.edit });
  }
  handleOpenModal = () =>{
    this.setState({showAnswerForm : true});
    console.log(this.state);
  }
  handleCloseModal =  () => {
    this.setState({ showAnswerForm: false });
  }

  render() {
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
              <Avatar id={this.state.creator} isAnonymous={false} hor />
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
        <div className="clearfix" style = {{ display: 'inline-block' }}>
          <div className = "float-left"> <Vote up={this.state.upvote} down={this.state.downvote} path={'solutions/' + this.props.id} ></Vote></div>
          <p className="float-right" onClick = { this.handleOpenModal } >comment</p>
        </div>
        <ReactModal isOpen={this.state.showAnswerForm}>
          <Avatar id={this.state.creator} isAnonymous={false} hor />
          <p>{this.state.content}</p>
          <FormGroup>
            <Label for="exampleText">Comment</Label>
            <Input type="textarea" name="text" id="exampleText" />
          </FormGroup>
          <div>
            <Button className="float-left" color="danger" onClick = {this.handleCloseModal}> Close </Button>
            <Button className="float-right" color="primary" onClick = { this.handleSubmit } > Submit </Button>
          </div>
        </ReactModal>
      </Card>
    );
  }
}