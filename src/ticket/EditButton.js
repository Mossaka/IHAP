import React from 'react';
import { GlobalContext } from '../utils/context';
import { Button } from 'reactstrap';

export default class EditButton extends React.Component {
  render() {
    return (
      <GlobalContext.Consumer>
        {user => {
          if (user && user.uid === this.props.id)
            return <Button onClick={this.props.onClick}>Edit</Button>
        }}
      </GlobalContext.Consumer>
    );
  }
}