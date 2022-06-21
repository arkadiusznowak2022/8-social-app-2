import React from 'react';
import './LikeOrNot.css';

type Props = {
  id: string;
  likePost: (e: React.MouseEvent<HTMLElement>) => void;
  dislikePost: (e: React.MouseEvent<HTMLElement>) => void;
  active: boolean;
  showLikeOrNot: (e: React.MouseEvent<HTMLElement>) => void;
};

function LikeOrNot({
  id,
  likePost,
  dislikePost,
  active,
  showLikeOrNot,
}: Props) {
  return (
    <div className={`like-or-not-cont ${active ? 'active' : ''}`}>
      <i
        className='fa-solid fa-thumbs-up like'
        id={id}
        onClick={(e) => {
          likePost(e);
          showLikeOrNot(e);
        }}
      ></i>
      <i
        className='fa-solid fa-thumbs-down dislike'
        id={id}
        onClick={(e) => {
          dislikePost(e);
          showLikeOrNot(e);
        }}
      ></i>
    </div>
  );
}

export default LikeOrNot;
