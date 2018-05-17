import React from 'react';
import {Link} from 'react-router-dom';
import greycard from '../../assets/greycard.jpg'
import avatar from '../../assets/img_avatar.png'
// import bookmark from '../../assets/bookmark.png'
import '../../styles/StoryPreview.css'

class StoryPreview extends React.Component {
  constructor(props) {
      super(props)
  }


  render() {
    return (
      <div className="story-preview">
        <div className="card" style={{"max-width": "14rem"}}>
            <img className="card-img-top img-fluid card-img" src={greycard} alt="Card image cap" />
            {/* there will be problem here if image is not fixed size. I set the card-img-overlay to a fixed size */}
            <div class="card-img-overlay" style={{height:'100px'}}> 
              <svg width='16' height='42' style={{float:'right'}}>
                <polygon points='0,0 0,33 8,40 16,33 16,0' />
              </svg>
            </div>
            <div className="card-body pb-1 pl-1 pr-1">
                <h6 className="card-title">Card Title</h6>
                <p className="card-text" style={{fontSize: '14px'}}>Story Preview.</p>
                <div className="card-author-info">
                  <Link to='/profile'>
                    <img className="avatar" src={avatar} style={{width: '35px'}} alt="Avatar" />
                  </Link>
                  <Link to='/profile'>
                    <p className='w-60 pt-3 mb-0 ml-1' style={{fontSize: '15px', float:'left'}}>username</p>
                  </Link>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default StoryPreview