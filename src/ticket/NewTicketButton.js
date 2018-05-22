import React from 'react';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class NewTicketButton extends React.Component {
  handleClick = () => {
    this.props.history.push('/ticket/new');
  }

  render() {
    return (
      <Button onClick={this.handleClick}>What's Your Problem</Button>
    );
  }
}

export default withRouter(NewTicketButton);
