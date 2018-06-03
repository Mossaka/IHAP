import React from 'react';
import { Button } from 'reactstrap';
import firebase from 'firebase'
import { MdPersonAdd } from 'react-icons/lib/md'

export default class UnfollowButton extends React.Component {
    constructor(props) {
        super(props);
        
    } 


  render() {
    return <Button color={"secondary"} style={{float:'left'}} onClick={this.props.handleUnfollow} size='sm'><MdPersonAdd width='25px' height='25px'/> Unfollow</Button>
  }
}