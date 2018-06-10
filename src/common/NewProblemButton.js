/*
 * This component defines the new problem button.
 * Click on this button to start writting about your problem.
 */
import React from 'react';
import firebase from 'firebase';
import { GlobalContext } from '../utils/context';
import { Button } from 'reactstrap';
import './NewProblemButton.css'
import { withRouter } from 'react-router-dom';

class NewProblemButton extends React.Component {
  toNewProblem = () => {
    if (!firebase.auth().currentUser) {
      return;
    }
    this.props.history.push('/ticket/new');
  }

  makeButton = (text) => {
    return (
      <Button className="postbutton" onClick={this.toNewProblem}>
        <span>{text}</span>
      </Button>
    );
  }

  render() {
    return (
      <div className="newProblemButton">
        <GlobalContext.Consumer>
          {user => user ? this.makeButton('Post Your Problem here') : this.makeButton('Sign In to Post')}
        </GlobalContext.Consumer>
      </div>
    )
  }
}

export default withRouter(NewProblemButton);
