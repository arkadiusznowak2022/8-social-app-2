import React, { useEffect, useState } from 'react';
import './Posts.css';
// import LikeOrNot from './LikeOrNot';
import { ApiPostsArgs, Post } from '../data/types';
import { useSelector } from 'react-redux';
import { selectToken } from '../redux/userSlice';
import LikeOrNot from './LikeOrNot';
import { usePostQuery } from '../redux/apiSlice';

type Props = {
  posts: Post[];
  renderLastPosts?: ApiPostsArgs;
  userName?: string;
};

function Posts({ posts, renderLastPosts, userName }: Props): JSX.Element {
  const token: string = useSelector(selectToken);
  const [postsArgs, setPostsArgs] = useState<ApiPostsArgs>({ url: 'latest' });
  const { data: answerPosts } = usePostQuery(postsArgs);

  useEffect(() => {
    if (!renderLastPosts) return;
    if (
      answerPosts?.message === 'Post deleted Successfully' ||
      answerPosts?.message === 'Like has been added' ||
      answerPosts?.message === 'Like has been removed'
    ) {
      setPostsArgs(renderLastPosts);
    }
  }, [answerPosts, renderLastPosts]);

  const clickDeletePost = (e: React.MouseEvent<HTMLElement>) => {
    setPostsArgs({
      url: 'delete',
      post: {
        post_id: (e.target as HTMLElement).id,
      },
    });
  };

  const clickLikePost = (e: React.MouseEvent<HTMLElement>) => {
    setPostsArgs({
      url: 'like',
      post: {
        post_id: (e.target as HTMLElement).id,
      },
    });
  };

  const clickDislikePost = (e: React.MouseEvent<HTMLElement>) => {
    setPostsArgs({
      url: 'dislike',
      post: {
        post_id: (e.target as HTMLElement).id,
      },
    });
  };

  /////////////////////////////////////////////////

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
  };
  const [idSelect, setIdSelect] = useState<string>('');

  const showLikeOrNot = (e: React.MouseEvent<HTMLElement>) => {
    if (!token) return;
    const id = (e.target as HTMLElement).id;
    if (id == idSelect) setIdSelect('');
    else setIdSelect(id);
  };

  const checkIfLiked = (id = -1) => {
    const post = posts.find((el) => {
      if (el.id === id) return true;
    });
    if (!post) return false;

    let flag = false;
    post.likes.forEach((el) => {
      if (el.username === userName) flag = true;
    });
    return flag;
  };

  ////////////////
  /// MARKUP

  const createMarkup = () => {
    const markup = posts.map((el) => {
      const created = new Intl.DateTimeFormat('en-GB', dateOptions).format(
        new Date(el.created_at)
      );

      return (
        <li className='post' key={el.id}>
          <img src={el.user.avatar_url} />
          <div className='post-content'>
            <p className='date'>{created}</p>
            <i
              className={`fa-solid fa-xmark x ${token && 'token'}`}
              id={el.id.toString()}
              onClick={clickDeletePost}
            ></i>
            <h3 className='text'>{el.content}</h3>
            <p className='likes-cont'>
              <i
                className={`fa-solid fa-heart love-it 
                ${checkIfLiked(el.id) && 'liked'}
                ${token && 'token'}`}
                id={el.id.toString()}
                onClick={showLikeOrNot}
              ></i>
              {el.likes.length}
            </p>
            <LikeOrNot
              id={el.id.toString()}
              likePost={clickLikePost}
              dislikePost={clickDislikePost}
              active={idSelect === el.id.toString()}
              showLikeOrNot={showLikeOrNot}
            />
            <p className='username'>{el.user.username}</p>
          </div>
        </li>
      );
    });
    return markup;
  };

  ////////////////
  /// RETURN

  return <ul className='posts-cont'>{posts && createMarkup()}</ul>;
}

export default Posts;
