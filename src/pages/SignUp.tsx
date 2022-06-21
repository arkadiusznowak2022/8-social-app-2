import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoBox from '../components/InfoBox';
import { DIFF_PASS_MSG, SHOW_MSG_TIME, WRONG_PASS_MSG } from '../data/config';
import { checkPassword, removeWhiteSpaces } from '../data/tools';
import { ApiAnswerSignUp } from '../data/types';
import { useUserQuery } from '../redux/apiSlice';
import './SignUp.css';

type SignUpType = {
  name: string;
  email: string;
  pass: string;
  passControl: string;
};

type ApiAnswer = {
  data?: ApiAnswerSignUp;
  error?: FetchBaseQueryError;
  isUninitialized: boolean;
};

////////////////////

function SignUp() {
  const [inputData, setInputData] = useState<SignUpType>({
    name: '',
    email: '',
    pass: '',
    passControl: '',
  });
  const [msg, setMsg] = useState<string>('');
  const [skip, setSkip] = useState<boolean>(true);

  const navi = useNavigate();

  const controlData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    let val = e.target.value;
    if (name === 'name') val = removeWhiteSpaces(val);

    setInputData({
      ...inputData,
      [name]: val,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let flag = true;

    if (inputData.pass !== inputData.passControl) {
      flag = false;
      setMsg(DIFF_PASS_MSG);
    }
    if (!checkPassword(inputData.pass)) {
      flag = false;
      setMsg(WRONG_PASS_MSG);
    }

    setSkip(!flag);
  };

  const { data, error } = useUserQuery<ApiAnswer>(
    {
      url: 'signup',
      user: {
        username: inputData.name,
        email: inputData.email,
        password: inputData.pass,
      },
    },
    { skip }
  );

  useEffect(() => {
    if (data) {
      setMsg(
        `${
          data.signedup ? 'You have a new account!' : data.message?.username[0]
        }`
      );
      setTimeout(() => {
        setMsg('');
        if (data.signedup) navi('/login');
      }, SHOW_MSG_TIME);
    }

    if (error) console.log(error);

    setSkip(true);
  }, [data, error, navi]);

  return (
    <div>
      <form className='signup-form' onSubmit={handleSubmit}>
        {msg && <InfoBox msg={msg} />}
        <input
          className='input'
          name='name'
          type='text'
          minLength={4}
          value={inputData.name}
          onChange={controlData}
          required
        />
        <input
          className='input'
          name='email'
          type='email'
          onChange={controlData}
          required
        />
        <input
          className='input'
          name='pass'
          type='password'
          onChange={controlData}
          required
        />
        <input
          className='input'
          name='passControl'
          type='password'
          onChange={controlData}
          required
        />
        <button type='submit'>Sign Up!</button>
      </form>
    </div>
  );
}

export default SignUp;
