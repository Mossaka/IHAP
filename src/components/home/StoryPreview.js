import React from 'react';
import {Link} from 'react-router-dom';
import greycard from '../../assets/greycard.jpg'

class StoryPreview extends React.Component {
  constructor(props) {
      super(props)
  }


  render() {
    return (
      <div className="story_preview">
        <div className="card" style={{width: "18rem"}}>
            <img className="card-img-top" src={greycard} alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
      </div>
    );
  }
}

export default StoryPreview