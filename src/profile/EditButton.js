import React from 'react';
import { Button } from 'reactstrap';
import { FaEdit } from 'react-icons/lib/fa'
import '../common/StyleButton.css'

export default class EditButton extends React.Component {
    constructor(props) {
        super(props);
    }

  render() {
    return (
        <div className='style-test'>
        <button className='btn' style={{float: 'right'}} onClick={this.props.toggleSetting}>
            <FaEdit width='25px' height='25px'/> Edit
        </button>
        </div>
    )
  }
}