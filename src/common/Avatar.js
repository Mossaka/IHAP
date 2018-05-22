import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import './Avatar.css';

export default class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      av: ''
    };

    let db = firebase.database();
    db.ref('profiles/' + props.id + '/username').once('value').then(n => {
      this.setState({ name: n.val() });
    });
    db.ref('profiles/' + props.id + '/avatar').once('value').then(a => {
      this.setState({ av: a.val() });
    });
  }

  render() {
    return (
      <div className="avatar">
        <Link to={'/profile/' + this.props.id}>
          <img src={this.state.av} />
          {this.state.name}
        </Link>
      </div>
    );
  }
}
