import React from 'react';
import { Button } from 'reactstrap';
import { FaEdit } from 'react-icons/lib/fa'

export default class EditButton extends React.Component {
    constructor(props) {
        super(props);
    }

  render() {
    return (
        <Button color={'secondary'} style={{float: 'right'}} size='sm' onClick={this.props.toggleSetting}>
            <FaEdit width='25px' height='25px'/> Edit
        </Button>
    )
  }
}