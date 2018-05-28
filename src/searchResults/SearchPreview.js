import React from 'react';
//import {Link} from 'react-router-dom';
//import avatar from '../assets/img_avatar.png'
// import bookmark from '../assets/bookmark.png'
import './SearchPreview.css'
import Bookmark from '../common/Bookmark';
import firebase from 'firebase';
import Avatar from '../common/Avatar'


class SearchPreview extends React.Component {
  constructor(props) {
    super(props)

    // Initialize states for this Story Preview component
    this.state = {
      ticketTitle: "Ticket Title!!",
      ticketDetails: "Ticket details... ",
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
          ticketDetails: (stripHtml(snapshot.val().content).length < 200) ? (stripHtml(snapshot.val().content)) : (stripHtml(snapshot.val().content).substr(0,197) + '...'),
          anonymous: snapshot.val().anonymous,
          creator: snapshot.val().creator
        });
      }
    });
  }

  render() {
    return (
      // <div className = "container">
        <div className ="search">
          
          <div className = "textbox">
            <div className ="title">
              <h5><b>{this.state.ticketTitle}</b></h5>
            </div> 
            <div className ="description">
              <p>{this.state.ticketDetails}</p> 
            </div>
          </div>
          <div className = "userbox">
            {this.state.creator && !this.state.anonymous && <Avatar id={this.state.creator} />}
            {/*<Link to='/profile'>
              <img className="avatar" src={avatar} style={{width: '35px'}} alt="Avatar" />
            </Link>
            <Link to='/profile'>
              <p className='w-60 pt-3 mb-0 ml-1' style={{fontSize: '15px', float:'left'}}>username</p>
            </Link>*/}
          </div>
          <Bookmark ticketID={this.props.ticketID}/>

        </div>
      // </div>
    );
  }
}

function stripHtml (html){
    var tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
}

export default SearchPreview