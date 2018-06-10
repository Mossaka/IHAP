/*
 * This component renders the string of the given timestamp.
 */
import React from 'react';
import './TimeDisplay.css'

export default function TimeDisplay(props) {
  let d = new Date(Number(props.time));
  let prefix = 'Last Edit: ';
  if (props.prefix) prefix = props.prefix;
  return <span className='timeDisplay'>{prefix + d.toLocaleString()}</span>;
}
