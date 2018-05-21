import React from 'react';
import { Link } from 'react-router-dom';
import greycard from '../assets/greycard.jpg'
import avatar from '../assets/img_avatar.png'
import firebase from 'firebase';
// import bookmark from '../assets/bookmark.png'
import './StoryPreview.css'

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
    ticket.once("value").then((snapshot) => {
      // If the problem field exists, bind a value change listener to the problem object in database
      if (snapshot.exists() && snapshot.child('problem').exists()) {
        var problemid = snapshot.child('problem').val();
        var problem = firebase.database().ref('problems/' + problemid);
        problem.on("value", (snapshot) => {
          // If snapshot exists, log the changes to the component's state
          if (snapshot.exists()) {
            this.setState({
              image: snapshot.child('image').val(),
              ticketTitle: snapshot.child('title').val().substring(0, 30),
              ticketDetails: snapshot.child('story').val().substring(0, 100)
            })
          }
        });
      }
      // If the owner field exists, set the avatar and username for this component
      if (snapshot.exists() && snapshot.child('owner').exists()) {
        var userid = snapshot.child('owner').val();
        var user = firebase.database().ref('users/' + userid);
        user.once("value").then((snapshot) => {
          if (snapshot.exists()) {
            this.setState({
              avatar: snapshot.child('avatar').val(),
              username: snapshot.child('username').val()
            })
          }
        })
      }
    })
  }


  render() {

    return (
      <div className="story-preview">
        <div className="card" >
          <Link className="clickable-card" to={'/ticket/' + this.props.ticketID}>
            <img className="card-img-top img-fluid card-img" src={this.state.image} alt="Card image cap" />
            {/* there will be problem here if image is not fixed size. I set the card-img-overlay to a fixed size */}
            <div className="card-img-overlay" style={{ height: '100px' }}>
              <svg width='16' height='42' style={{ float: 'right' }}>
                <polygon points='0,0 0,33 8,40 16,33 16,0' />
              </svg>
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