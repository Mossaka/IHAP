import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import './Avatar.css';
import anonymousAvatar from '../assets/anonymous-avatar.jpg';


export default class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Anonymous',
      avatar: anonymousAvatar
    };

    let db = firebase.database();
    console.log("isanonymous: " + props.isAnonymous)
    db.ref('profiles/' + props.id).once('value').then(snapshot => {
      if(props.isAnonymous === false) {
        this.setState({...snapshot.val()})
        console.log(props.id)
      }
    });
  }

  render() {
    return (
      <div className="avatar">
        <Link to={'/profile/' + this.props.id} className='link'>
          <img src={this.state.avatar} alt="avatar"/>
          {"  " + this.state.username.substring(0,15)}
        </Link>
      </div>
    );
  }
}
