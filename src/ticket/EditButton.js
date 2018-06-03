import React from 'react';
import { GlobalContext } from '../utils/context';
import { Button } from 'reactstrap';
import './EditButton.css'

export default class EditButton extends React.Component {
  render() {
    return (
        <div className="editButton">
          <GlobalContext.Consumer>
            {user => {
              if (user && user.uid === this.props.id)
               return <Button className="button" onClick={this.props.onClick}>Edit</Button>
            }}
          </GlobalContext.Consumer>
        </div>
    );
  }
}