import React, { useEffect, useState } from 'react';
import { ApiFollowsArgs, User } from '../data/types';
import { useFollowsQuery } from '../redux/apiSlice';
import './UsersList.css';

type Props = {
  refetch: () => void;
};

function UsersList({ refetch }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [followsType, setFollowsType] = useState<string>('allfollows');
  const [apiArgs, setApiArgs] = useState<ApiFollowsArgs>({ url: 'allfollows' });

  const { data: answerFollows } = useFollowsQuery(apiArgs);

  useEffect(() => {
    if (!answerFollows) return;
    if (
      answerFollows.message === 'Follow has been removed' ||
      answerFollows.message === 'Follow has been added'
    ) {
      setApiArgs({ url: followsType });
      return;
    }

    setUsers(answerFollows);
    refetch();
  }, [answerFollows, followsType, refetch]);

  const deleteUser = (e: React.MouseEvent<HTMLElement>) => {
    setApiArgs({
      url: 'disfollow',
      follows: {
        leader_id: (e.target as HTMLElement).id,
      },
    });
  };

  const addUser = (e: React.MouseEvent<HTMLElement>) => {
    setApiArgs({
      url: 'follow',
      follows: {
        leader_id: (e.target as HTMLElement).id,
      },
    });
  };

  const clickFriends = () => {
    setApiArgs({ url: 'allfollows' });
    setFollowsType('allfollows');
  };

  const clickRecommended = () => {
    setApiArgs({ url: 'recommendations' });
    setFollowsType('recommendations');
  };

  const createMarkup = (users: User[]) => {
    const markup = users.map((el) => {
      const id = el.id?.toString();
      return (
        <li key={id}>
          <img src={el.avatar_url} alt='avatar' />
          <h3>{el.username}</h3>
          <p>({el.email})</p>
          {apiArgs.url === 'allfollows' ? (
            <i className='fa-solid fa-xmark' id={id} onClick={deleteUser}></i>
          ) : (
            <i
              className='fa-solid fa-circle-plus'
              id={id}
              onClick={addUser}
            ></i>
          )}
        </li>
      );
    });
    return markup;
  };

  return (
    <div className='users-cont'>
      <div className='buttons-panel-users'>
        <button
          className={apiArgs.url === 'recommendations' ? 'btn-no-acitve' : ''}
          onClick={clickFriends}
        >
          Friends
        </button>
        <button
          className={apiArgs.url === 'allfollows' ? 'btn-no-acitve' : ''}
          onClick={clickRecommended}
        >
          Recommended
        </button>
      </div>
      <ul className='users-list'>{users && createMarkup(users)}</ul>
    </div>
  );
}

export default UsersList;
