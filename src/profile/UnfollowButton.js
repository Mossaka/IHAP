/*
 * This is the unfollow user button.
 */
import React from 'react';
import { MdPersonAdd } from 'react-icons/lib/md';
import '../common/StyleButton.css';

export default class UnfollowButton extends React.Component {
  render() {
    return (
      <div className="style-btn-secondary">
        <button color="secondary" style={{ float: 'left' }} onClick={this.props.handleUnfollow} size="sm">
          <MdPersonAdd width='25px' height='25px' /> Unfollow
        </button>
      </div>
    );
  }
}