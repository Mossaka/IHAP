import React from 'react';
import {Link} from 'react-router-dom';
import avatar from '../assets/img_avatar.png'
// import bookmark from '../assets/bookmark.png'
import './SearchPreview.css'
import Bookmark from '../common/Bookmark';


class SearchPreview extends React.Component {

  render() {
    return (
      <div className = "container">
        <div className ="search">
          <div className = "textbox">
            <div className ="title">
              <h5><b>Title</b></h5>
            </div> 
            <div className ="description">
              <p>Description: What's in a name? That which we call a rose. By any other word would smell as sweet;</p> 
            </div>
          </div>
          <div className = "userbox">
            <Link to='/profile'>
              <img className="avatar" src={avatar} style={{width: '35px'}} alt="Avatar" />
            </Link>
            <Link to='/profile'>
              <p className='w-60 pt-3 mb-0 ml-1' style={{fontSize: '15px', float:'left'}}>username</p>
            </Link>
          </div>
          <Bookmark ticketID={this.props.ticketID}/>

        </div>
      </div>
    );
  }
}

export default SearchPreview