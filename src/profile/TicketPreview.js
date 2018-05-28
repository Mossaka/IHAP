import React from 'react';
import {Link, Redirect} from 'react-router-dom';
//import avatar from '../assets/img_avatar.png'
// import bookmark from '../assets/bookmark.png'
import './TicketPreview.css'
import Bookmark from '../common/Bookmark';
import firebase from 'firebase';
import Avatar from '../common/Avatar'


class TicketPreview extends React.Component {
  constructor(props) {
    super(props)

    // Initialize states for this Story Preview component
    this.state = {
      ticketTitle: "Ticket Title!!",
      ticketDetails: "Ticket details... ",
      redirect: false,
    }
    
    this.changeRoute = this.changeRoute.bind(this);
  }

  componentDidMount() {
    // Get the ticket from database
    if(this.props.ticketID) {
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
                creator: snapshot.val().creator,
                ticketID: this.props.ticketID
            });
        }
        });
    } else {
        const solutionID = this.props.solutionID;
        const db = firebase.database();
        db.ref("solutions/" + solutionID + '/ticket/').once('value').then(snapshot => {
            const ticketID = snapshot.val();
            // console.log(snapshot.val());
            db.ref('tickets/' + ticketID).once('value').then(snapshot => {
                if(snapshot.exists()) {
                    this.setState(
                    {   
                        image: snapshot.val().image,
                        ticketTitle: snapshot.val().title.substring(0, 30),
                        ticketDetails: (stripHtml(snapshot.val().content).length < 200) ? (stripHtml(snapshot.val().content)) : (stripHtml(snapshot.val().content).substr(0,197) + '...'),
                        anonymous: snapshot.val().anonymous,
                        creator: snapshot.val().creator,
                        ticketID: ticketID
                    });
                }
            })
        })
    }
  }

  changeRoute() {
      this.setState({redirect: true,})
  }

  render() {
    if(this.state.redirect)
        return <Redirect push to={"/ticket/" + this.state.ticketID }/>;
    

    return (
      // <div className = "container">
      <div className='ticket-preview' onClick={this.changeRoute}>
        {/* <Link className="clickable-card" to={'/ticket/' + this.state.ticketID}></Link> */}
        <div className = "textbox">
        <div className ="title">
            <h5><b>{this.state.ticketTitle}</b></h5>
        </div> 
        <div className ="description">
            <p>{this.state.ticketDetails}</p> 
        </div>
        </div>
    </div>
    );
  }
}

function stripHtml (html){
    var tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
}

export default TicketPreview