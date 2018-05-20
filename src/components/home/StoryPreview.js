import React from 'react';
import {Link} from 'react-router-dom';
import greycard from '../../assets/greycard.jpg'
import avatar from '../../assets/img_avatar.png'
import * as firebase from 'firebase';
// import bookmark from '../../assets/bookmark.png'
import '../../styles/StoryPreview.css'

class StoryPreview extends React.Component {
  constructor(props) {
      super(props)

      this.state = {
        avatar: avatar,
        image: greycard,
        username: "myusername",
        ticketTitle: "Ticket Title!!",
        ticketDetails: "Ticket details... "
      }


      var ticket = firebase.database().ref('tickets/' + this.props.ticketID);
      ticket.once("value").then((snapshot) => {
        if(snapshot.exists() && snapshot.child('problem').exists()){
          var problemid = snapshot.child('problem').val();
          var problem = firebase.database().ref('problems/' + problemid);
          problem.on("value", (snapshot) => {
            if(snapshot.exists()) {
              this.setState({
                image: snapshot.child('image').val(),
                ticketTitle: snapshot.child('title').val().substring(0, 30),
                ticketDetails: snapshot.child('story').val().substring(0, 100)
              })
              console.log(this.state.ticketTitle);
            }
          }); 
        }
        
        if(snapshot.exists() && snapshot.child('owner').exists()) {
          var userid = snapshot.child('owner').val();
          var user = firebase.database().ref('users/' + userid); 
          user.once("value").then((snapshot) => {
            if(snapshot.exists()) {
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
            <img className="card-img-top img-fluid card-img" src={this.state.image} alt="Card image cap" />
            {/* there will be problem here if image is not fixed size. I set the card-img-overlay to a fixed size */}
            <div className="card-img-overlay" style={{height:'100px'}}> 
              <svg width='16' height='42' style={{float:'right'}}>
                <polygon points='0,0 0,33 8,40 16,33 16,0' />
              </svg>
            </div>
            <div className="card-body pb-1 pl-1 pr-1">
                <h6 className="card-title">{this.state.ticketTitle}</h6>
                <p className="card-text" style={{fontSize: '14px'}}>{this.state.ticketDetails}</p>
                <div className="card-author-info">
                  <Link to='/profile'>
                    <img className="avatar" src={this.state.avatar} alt="Avatar" />
                  </Link>
                  <Link to='/profile'>
                    <p className='w-60 pt-3 mb-0 ml-1' style={{fontSize: '15px', float:'left'}}>{this.state.username}</p>
                  </Link>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default StoryPreview