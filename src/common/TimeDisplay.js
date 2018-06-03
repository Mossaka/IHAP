import React from 'react';
import './TimeDisplay.css'

export default function TimeDisplay(props) {
  let d = new Date(Number(props.time));
  return <span className='timeDisplay'>{'Last Edit: '+d.toLocaleString()}</span>;
}