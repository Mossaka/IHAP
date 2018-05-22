import React from 'react';
import { Button } from 'reactstrap';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';

class NewTicketButton extends React.Component {
  handleClick = () => {
    const db = firebase.database();
    const user = firebase.auth().currentUser;
    let p = db.ref('problems').push({ creator: user.uid });
    let t = db.ref('tickets').push({ problem: p.key });
    this.props.history.push(`/ticket/${t.key}`, { mode: 'edit' });
  }

  render() {
    return (
      <Button onClick={this.handleClick}>What's Your Problem</Button>
    );
  }
}

export default withRouter(NewTicketButton);
