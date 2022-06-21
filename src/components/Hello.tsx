import React from 'react';
import './Hello.css';

function Hello(): JSX.Element {
  return (
    <div className='hello-cont'>
      <h1>Welcome to Chatterfield!</h1>
      <h2>
        Sign up as the new user or log in and dive into some chat adventure!
      </h2>
    </div>
  );
}

export default Hello;
