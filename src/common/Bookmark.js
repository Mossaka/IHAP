import firebase from 'firebase';
import React from 'react';
import {Link} from 'react-router-dom';
import './Bookmark.css'

class Bookmark extends React.Component {
    constructor(props) {
        super(props)

        this.onBookmarkClick = this.onBookmarkClick.bind(this);
    }

    onBookmarkClick(event) {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                var updates = {};
                var count = null;
                // var problemID = null;
                const uid = user.uid;
                const ticketID = this.props.ticketID;
                // firebase.database().ref('tickets/' + ticketID + "/problem").on('value', (snapshot) => {
                //     problemID = snapshot.val();  
                // })
                firebase.database().ref('tickets/' + ticketID + '/bookmarkCount').on('value', snapshot => {
                    count = snapshot.val().valueOf() + 1;
                })
                if(count != null) {
                    updates['bookmarkCount'] = count
                    firebase.database().ref('tickets/' + ticketID).update(updates)
                }
                firebase.database().ref('notebooks/' + uid + '/bookmarked/').push(ticketID);
            } else {
                alert("user not signin!");
            }
        })
        
        event.preventDefault();
    }

    render(){
        return (
            <div className='bookmark'>
                <svg width='16' height='42' style={{float:'right'}} onClick={this.onBookmarkClick}>
                    <polygon points='0,0 0,33 8,40 16,33 16,0' />
                </svg>
            </div>
        )
    }

}

export default Bookmark;