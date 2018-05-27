import firebase from 'firebase';
import React from 'react';
import './Bookmark.css'

class Bookmark extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            bookmarked: false
        }
        this.bookmark = this.bookmark.bind(this);
        this.unbookmark = this.unbookmark.bind(this);

        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                const uid = user.uid;
                // Attempt to use database to get child by value
                /*
                firebase.database().ref('notebooks/' + uid).orderByChild("bookmarked").equalTo(this.props.ticketID).once('value').then((snapshot) => {
                    
                    this.setState({bookmarked: true});
                    return true;
                })*/
                
                firebase.database().ref('notebooks/' + uid + '/bookmarked').once('value').then(snapshot => {
                    snapshot.forEach(childSnapshot => {
                        if( childSnapshot.val() === this.props.ticketID ) {
                            this.setState({bookmarked: true});
                            return true;
                        }
                    })
                })
            } else {
                this.setState({bookmarked: false})
            }
        })
    }

    bookmark(event) {
        if(!this.state.bookmarked) {
            firebase.auth().onAuthStateChanged(user => {
                if(user) {
                    const uid = user.uid;
                    const ticketID = this.props.ticketID;

                    firebase.database().ref('notebooks/' + uid + '/bookmarked/').push(this.props.ticketID).catch(() => {
                        console.log('unbookmark failed.');
                    });
                    this.setState({ bookmarked: true });

                } else {
                    alert("Please sign in to bookmark!");
                }
            })
        }
        
        event.preventDefault();
    }

    unbookmark(event) {
        if(this.state.bookmarked) {
            firebase.auth().onAuthStateChanged(user => {
                if(user) {
                    const uid = user.uid;
                    const ticketID = this.props.ticketID;

                    firebase.database().ref('notebooks/' + uid + '/bookmarked').once('value').then(snapshot => {
                        snapshot.forEach(childSnapshot => {
                            if( childSnapshot.val() === this.props.ticketID ) {
                                firebase.database().ref('notebooks/' + uid + '/bookmarked/' + childSnapshot.key).remove().then(
                                    () => {
                                        this.setState({ bookmarked: false })
                                    }
                                ).catch(() => {
                                    console.log('unbookmark failed.');
                                });
                                return true;
                            }
                        })
                    })
                    

                } else {
                    alert("Please sign in to unbookmark!");
                }
            })
        }

        event.preventDefault();
    }

    render(){
        if(!this.state.bookmarked) {
            return (
                <div title="Bookmark" className='bookmark'>
                    <svg width='16' height='42' style={{float:'right'}} onClick={this.bookmark}>
                        <polygon points='0,0 0,33 8,40 16,33 16,0' />
                    </svg>
                </div>
            )
        } else {
            return (
                <div title="Unbookmark" className='bookmark'>
                    <svg width='16' height='42' style={{float:'right'}} onClick={this.unbookmark}>
                        <polygon style={{opacity: '1'}} points='0,0 0,33 8,40 16,33 16,0' />
                    </svg>
                </div>
            )
        }
    }

}

export default Bookmark;