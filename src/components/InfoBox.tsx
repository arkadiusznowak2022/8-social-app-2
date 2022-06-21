import React from 'react';
import './InfoBox.css';

type Props = {
  msg: string;
};

function InfoBox({ msg }: Props) {
  return (
    <div className='info-cont'>
      <p className='info-text'>{msg}</p>
    </div>
  );
}

export default InfoBox;
