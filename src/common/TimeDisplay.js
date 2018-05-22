import React from 'react';

export default function TimeDisplay(props) {
  let d = new Date(Number(props.time));
  return <span>{d.toLocaleString()}</span>
}