/*
 * This component displays a preview of the given user.
 * This is used on the search page.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import './SearchPreview.css';
import Avatar from '../common/Avatar';

export default class UserPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      Bio: '',
      Avatar: ''
    };
  }

  render() {
    return (
      <div className="search-result">
        <Avatar id={this.props.user.id} />
        <Link className="bio" to={'/profile/' + this.props.user.id}>{this.props.user.bio}</Link>
      </div>
    );
  }
}
