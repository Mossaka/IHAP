import firebase from 'firebase';
import React from 'react';
import {Link} from 'react-router-dom';
import './Bookmark.css'

class Bookmark extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            bookmarked: false
        }
        this.onBookmarkClick = this.onBookmarkClick.bind(this);

        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                const uid = user.uid;
                const ticketID = this.props.ticketID;
                firebase.database().ref('notebooks/' + uid + '/bookmarked').on('value', snapshot => {
                    snapshot.forEach(childSnapshot => {
                        let bookmarked = childSnapshot.val() === this.props.ticketID;
                        console.log(bookmarked)
                        this.setState({bookmarked: bookmarked});
                    })
                })
            } else {
                this.setState({bookmarked: false})
            }
        })
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
                    this.setState({bookmarked: true})
                    firebase.database().ref('tickets/' + ticketID).update(updates)
                    firebase.database().ref('notebooks/' + uid + '/bookmarked/').push(ticketID);
                }
            } else {
                alert("user not signin!");
            }
        })
        
        event.preventDefault();
    }

    render(){
        if(!this.state.bookmarked) {
            return (
                <div className='bookmark'>
                    <svg width='16' height='42' style={{float:'right'}} onClick={this.onBookmarkClick}>
                        <polygon points='0,0 0,33 8,40 16,33 16,0' />
                    </svg>
                </div>
            )
        } else {
            return (
                <div className='bookmark'>
                    <svg width='16' height='42' style={{float:'right'}}>
                        <polygon style={{opacity: '1'}} points='0,0 0,33 8,40 16,33 16,0' />
                    </svg>
                </div>
            )
        }
    }

}

export default Bookmark;