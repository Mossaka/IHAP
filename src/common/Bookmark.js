/*
 * This component allows the user to bookmark or unbookmark a ticket.
 * Pass in the id of the ticket on which this bookmark is used. 
 */
import firebase from 'firebase';
import React from 'react';
import './Bookmark.css';

export default class Bookmark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      bookmarked: false
    };
  }

  componentDidMount() {
    this.unsub = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ disabled: false });
        firebase.database()
          .ref('notebooks/' + user.uid + '/bookmarked')
          .orderByValue()
          .equalTo(this.props.id).once('value', ss => {
            if (ss.val()) {
              for (let key in ss.val()) {
                this.key = key;
              }
              this.setState({ bookmarked: true });
            }
          });
      } else {
        this.setState({ disabled: true });
      }
    });
  }

  componentWillUnmount() {
    this.unsub();
  }

  bookmark = e => {
    if (this.state.disabled) {
      alert('Please sign in to bookmark this ticket');
      return;
    }

    let uid = firebase.auth().currentUser.uid;
    let db = firebase.database();
    if (this.state.bookmarked) {
      db.ref('notebooks/' + uid + '/bookmarked/' + this.key).remove();
      this.setState({ bookmarked: false });
    }
    else {
      this.key = db.ref('notebooks/' + uid + '/bookmarked').push(this.props.id).key;
      this.setState({ bookmarked: true });
    }
  }

  render() {
    return (
      <svg className='bookmark' onClick={this.bookmark}>
        <g className={`${this.state.disabled ? 'disabled' : ''}${this.state.bookmarked ? ' bookmarked' : ''}`}>
          <path d="M12 17.27l6.18 3.73-1.64-7.03 5.46-4.73-7.19-.61-2.81-6.63-2.81 6.63-7.19.61 5.46 4.73-1.64 7.03z" />
        </g>
      </svg>
    );
  }
}
