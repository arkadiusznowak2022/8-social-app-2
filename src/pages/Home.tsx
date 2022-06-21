import React, { useEffect, useState } from 'react';
import './Home.css';

import Posts from '../components/Posts';
import { ApiPostsArgs, Post } from '../data/types';
import { usePostQuery, useUserQuery } from '../redux/apiSlice';
import ProfilePilot from '../components/ProfilePilot';
import UsersList from '../components/UsersList';

///

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsArgs, setPostsArgs] = useState<ApiPostsArgs>({ url: 'latest' });
  const [history, setHistory] = useState<ApiPostsArgs>({ url: 'latest' });

  const { data: answerPosts, refetch } = usePostQuery(postsArgs);
  const { data: answerProfile } = useUserQuery({ url: 'profile' });

  useEffect(() => {
    if (!answerPosts) return;
    if (answerPosts.message === 'Post added') {
      setPostsArgs(history);
      return;
    }
    setPosts(answerPosts);
  }, [answerPosts, history]);

  //////////////
  //// MARKUP

  return (
    <div className='home-page'>
      {answerProfile && (
        <ProfilePilot
          profileData={answerProfile}
          setPostsArgs={setPostsArgs}
          setHistory={setHistory}
        />
      )}
      <Posts
        posts={posts}
        renderLastPosts={postsArgs}
        userName={answerProfile?.username || ''}
      />
      <UsersList refetch={refetch} />
    </div>
  );
}

export default Home;
