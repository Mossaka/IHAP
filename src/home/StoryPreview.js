import React from 'react';
import { Link } from 'react-router-dom';
import greycard from '../assets/greycard.jpg'
import firebase from 'firebase';
// import bookmark from '../assets/bookmark.png'
import './StoryPreview.css'
import Bookmark from '../common/Bookmark';
import Avatar from '../common/Avatar';

class StoryPreview extends React.Component {
  constructor(props) {
    super(props)

    // Initialize states for this Story Preview component
    this.state = {
      image: greycard,
      ticketTitle: "Ticket Title!!",
      ticketDetails: "Ticket details... ",
      anonymous: true
    }

    // Get the ticket from database
    var ticket = firebase.database().ref('tickets/' + this.props.ticketID);
    // Once we get the ticket snapshot,
    ticket.once('value').then((snapshot) => {
      // If the problem field exists, bind a value change listener to the problem object in database
      if (snapshot.exists()) {
        this.setState({
          image: snapshot.val().image,
          ticketTitle: snapshot.val().title.substring(0, 30),
          ticketDetails: snapshot.val().content.substring(0, 100),
          anonymous: snapshot.val().anonymous,
          creator: snapshot.val().creator
        });
      }
    });
  }


  render() {

    return (
      <div className="story-preview">
        <div className="card" style={{ height: '400px' }}>
          <Link className="clickable-card" to={'/ticket/' + this.props.ticketID}></Link>

          <img className="card-img-top img-fluid card-img" src={this.state.image} alt="ticket thumbnail" />
          {/* there will be problem here if image is not fixed size. I set the card-img-overlay to a fixed size */}
          <div className="card-img-overlay" style={{ height: '100px' }}>
            <Bookmark ticketID={this.props.ticketID} />
          </div>

          <div className="card-body pb-1 pl-1 pr-1">
            <h6 className="card-title">
              {this.state.ticketTitle}
            </h6>
            <p className="card-text" style={{ fontSize: '14px' }}>{this.state.ticketDetails}</p>
          </div>
          {this.state.creator && !this.state.anonymous && <Avatar id={this.state.creator}  style={{position: 'absolute', bottom: '0px', backgroundimage: 'url("greycard.jpg")'}}/>}
         </div>
      </div>
    );
  }
}

export default StoryPreview
