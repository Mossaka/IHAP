import firebase from 'firebase';
import React from 'react';
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
                firebase.database().ref('notebooks/' + uid + '/bookmarked').on('value', snapshot => {
                    snapshot.forEach(childSnapshot => {
                        if( childSnapshot.val() === this.props.ticketID ) {
                            this.setState({bookmarked: true});
                        }
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
                // var problemID = null;
                const uid = user.uid;
                const ticketID = this.props.ticketID;
                // firebase.database().ref('tickets/' + ticketID + "/problem").on('value', (snapshot) => {
                //     problemID = snapshot.val();  
                // })
                if(this.state.bookmarked === false) {
                    this.setState({bookmarked: true})
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
                <svg width='25' height='40' style={{float:'right'}} onClick={this.onBookmarkClick}>
                    <g>
                        <path d="M12 17.27l6.18 3.73-1.64-7.03 5.46-4.73-7.19-.61-2.81-6.63-2.81 6.63-7.19.61 5.46 4.73-1.64 7.03z"></path>
                    </g>
                </svg>    
  
                    {/*<svg width='16' height='42' style={{float:'right'}} onClick={this.onBookmarkClick}>
                        <polygon points='0,0 0,33 8,40 16,33 16,0' />
                    </svg>*/}
                </div>
            )
        } else {
            return (
                <div className='bookmark'>
                    <svg width='25' height='40' style={{float:'right'}}>
                    <g style={{opacity: '1'}}>
                        <path d="M12 17.27l6.18 3.73-1.64-7.03 5.46-4.73-7.19-.61-2.81-6.63-2.81 6.63-7.19.61 5.46 4.73-1.64 7.03z"></path>
                    </g>
                    </svg> 
                    {/*<svg width='16' height='42' style={{float:'right'}}>
                        <polygon style={{opacity: '1'}} points='0,0 0,33 8,40 16,33 16,0' />
                    </svg>*/}
                </div>
            )
        }
    }

}

export default Bookmark;