import React from 'react';
import { Link } from 'react-router-dom';
import greycard from '../assets/greycard.jpg'
import avatar from '../assets/img_avatar.png'
import firebase from 'firebase';
// import bookmark from '../assets/bookmark.png'
import './StoryPreview.css'
import Bookmark from '../common/Bookmark';

class StoryPreview extends React.Component {
  constructor(props) {
    super(props)

    // Initialize states for this Story Preview component
    this.state = {
      avatar: avatar,
      image: greycard,
      username: "myusername",
      ticketTitle: "Ticket Title!!",
      ticketDetails: "Ticket details... "
    }

    // Get the ticket from database
    var ticket = firebase.database().ref('tickets/' + this.props.ticketID);
    // Once we get the ticket snapshot, 
    ticket.once('value').then((snapshot) => {
      // If the problem field exists, bind a value change listener to the problem object in database
      if (snapshot.exists()) {
        this.setState({
          image: snapshot.child('image').val(),
          ticketTitle: snapshot.child('title').val().substring(0, 30),
          ticketDetails: snapshot.child('content').val().substring(0, 100)            
        })
        if(snapshot.child('creator').exists()) {
          let userid = snapshot.child('creator').val();
          let profile = firebase.database().ref('profiles/' + userid);
          profile.once('value').then((snapshot) => {
            this.setState({
              avatar: snapshot.child('avatar').val(),
              username: snapshot.child('username').val()
            })
          })
        }  
      }
    });
  }


  render() {

    return (
      <div className="story-preview">
        <div className="card" >
          <Link className="clickable-card" to={'/ticket/' + this.props.ticketID}>
            <img className="card-img-top img-fluid card-img" src={this.state.image} alt="Card image cap" />
            {/* there will be problem here if image is not fixed size. I set the card-img-overlay to a fixed size */}
            <div className="card-img-overlay" style={{ height: '100px' }}>
              <Bookmark ticketID={this.props.ticketID}/>
            </div>
            
            <div className="card-body pb-1 pl-1 pr-1">
              <h6 className="card-title">
                {this.state.ticketTitle}
              </h6>
              <p className="card-text" style={{ fontSize: '14px' }}>{this.state.ticketDetails}</p>
              <div className="card-author-info">
                <Link to='/profile'>
                  <img className="avatar" src={this.state.avatar} alt="Avatar" />
                </Link>
                <Link to='/profile'>
                  <p className='w-60 pt-3 mb-0 ml-1' style={{ fontSize: '15px', float: 'left' }}>{this.state.username}</p>
                </Link>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default StoryPreview