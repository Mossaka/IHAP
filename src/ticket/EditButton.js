import React from 'react';
import { GlobalContext } from '../utils/context';
import { Button } from 'reactstrap';
import './EditButton.css';
import '../common/StyleButton.css';

export default class EditButton extends React.Component {
  render() {
    return (
        <div className="editButton">
          <GlobalContext.Consumer>
            {user => {
              if (user && user.uid === this.props.id)
               return <div className='style-btn-secondary'><Button className="secondary" onClick={this.props.onClick}>Edit</Button></div>
            }}
          </GlobalContext.Consumer>
        </div>
    );
  }
}