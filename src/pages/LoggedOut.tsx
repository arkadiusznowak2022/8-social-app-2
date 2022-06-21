import './LoggedOut.css';
import React, { useEffect, useState } from 'react';
import { usePostQuery } from '../redux/apiSlice';
import { Post } from '../data/types';
import Posts from '../components/Posts';
import Hello from '../components/Hello';
import LoginPopup from '../components/LoginPopup';
import { TIME_TO_LOGIN_POPUP } from '../data/config';

function LoggedOut(): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([]);
  const [bombingPopup, setBombingPopup] = useState<React.ReactNode>('');
  const { data } = usePostQuery({ url: 'latest' });

  useEffect(() => {
    setTimeout(() => {
      setBombingPopup(<LoginPopup />);
    }, TIME_TO_LOGIN_POPUP);

    return () => {
      setBombingPopup('');
    };
  }, []);

  useEffect(() => {
    if (data) setPosts(data);
  }, [data]);

  return (
    <div className='main-cont'>
      <Posts posts={posts} />
      <Hello />
      {bombingPopup}
    </div>
  );
}

export default LoggedOut;
