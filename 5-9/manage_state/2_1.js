import { useState } from 'react';
//error:dont mirror prop into state
export default function Clock(props) {
  
  return (
    <h1 style={{ color: props.color }}>
      {props.time}
    </h1>
  );
}
