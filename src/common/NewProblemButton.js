import React from 'react';
import firebase from 'firebase';
import { GlobalContext } from '../utils/context';
import { Button } from 'reactstrap';
import './NewProblemButton.css'
import { Link, withRouter } from 'react-router-dom';

class NewProblemButton extends React.Component {
    constructor(props) {
        super(props);
        
        this.toNewProblem = this.toNewProblem.bind(this);
        this.makeButton = this.makeButton.bind(this);
    }

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
              <div className="new-problem-button"> 
                <GlobalContext.Consumer>
                    {user => user ? this.makeButton('Post Your Problem here') : this.makeButton('Sign In to Post')}
                </GlobalContext.Consumer>
              </div>
          )
      }
}

export default withRouter(NewProblemButton);
