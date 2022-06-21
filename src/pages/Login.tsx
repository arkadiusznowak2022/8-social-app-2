import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InfoBox from '../components/InfoBox';
import { LOGIN_DEMO_MSG, SHOW_MSG_TIME } from '../data/config';
import { ApiAnswerLogin } from '../data/types';
import { useUserQuery } from '../redux/apiSlice';
import { AppDispatch } from '../redux/store';
import { setToken } from '../redux/userSlice';
import './Login.css';

function Login() {
  const [skip, setSkip] = useState<boolean>(true);
  const [inputData, setInputData] = useState({
    login: '',
    pass: '',
  });
  const [msg, setMsg] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleAPIAnswer = useCallback(
    (res: ApiAnswerLogin) => {
      const { username, password, jwt_token: jwtToken, error } = res;
      error && showMessage('Wrong login or password');

      if (jwtToken) {
        dispatch(setToken(jwtToken));
        navigate('/');
      } else {
        password && showMessage(password);
        username && showMessage(username);
      }
    },
    [dispatch, navigate]
  );

  const { data, error } = useUserQuery(
    {
      url: 'login',
      user: {
        username: inputData.login,
        password: inputData.pass,
        ttl: 3600,
      },
    },
    { skip }
  );

  useEffect(() => {
    if (data) handleAPIAnswer(data);

    setSkip(true);
  }, [data, error, handleAPIAnswer]);

  const showMessage = (txt: string): void => {
    setMsg(txt);
    setTimeout(() => setMsg(''), SHOW_MSG_TIME);
  };

  const controlData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setInputData({
      ...inputData,
      [target.name]: target.value,
    });
  };

  const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSkip(false);
  };

  return (
    <div>
      <form className='login-form' onSubmit={submitLogin}>
        {msg && <InfoBox msg={msg} />}
        <input readOnly type='text' value={LOGIN_DEMO_MSG} />
        <input name='login' type='text' onChange={controlData} />
        <input name='pass' type='password' onChange={controlData} />
        <button type='submit'>Log in</button>
      </form>
    </div>
  );
}

export default Login;
