import React, { useState } from 'react';
import './ProfilePilot.css';
import Manager from './Manager';
import { ApiAnswerUser, ApiPostsArgs, ManagerData } from '../data/types';

type Props = {
  profileData: ApiAnswerUser;
  setPostsArgs: (args: ApiPostsArgs) => void;
  setHistory: (arg: ApiPostsArgs) => void;
};

function ProfilePilot({ profileData, setPostsArgs, setHistory }: Props) {
  const [managerType, setManagerType] = useState('');

  const manageManager = (type: string) => {
    if (managerType === type) {
      setManagerType('');
    } else setManagerType(type);
  };

  const manageClass = (type: string) => {
    if (!type || type === 'newest') return '';
    if (type === 'add') return 'manager';
    else return 'manager-min';
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:00.000000Z`;
  };

  const managerHandler = (type: string, data?: ManagerData) => {
    if (type === 'newest') {
      setHistory({ url: 'latest' });
      setPostsArgs({ url: 'latest' });
    }

    if (!data) return;

    if (type === 'add') {
      setPostsArgs({
        url: 'add',
        post: {
          content: data.add,
        },
      });
    }
    if (type === 'from') {
      const apiArgs = {
        url: 'newer-then',
        post: {
          date: formatDate(data.from),
        },
      };

      setHistory(apiArgs);
      setPostsArgs(apiArgs);
    }
    if (type === 'till') {
      const apiArgs = {
        url: 'older-then',
        post: {
          date: formatDate(data.till),
        },
      };

      setHistory(apiArgs);
      setPostsArgs(apiArgs);
    }
  };

  if (!profileData) return <div></div>;
  return (
    <div className={`profile-cont ${manageClass(managerType)}`}>
      <div className='pilot'>
        <img src={profileData.avatar_url} alt='avatar' />
        <h3>{profileData.username}</h3>
        <p>{profileData.email}</p>
        <div className='buttons-panel'>
          <button onClick={() => manageManager('add')}>add</button>
          <button
            onClick={() => {
              manageManager('newest');
              managerHandler('newest');
            }}
          >
            newest
          </button>
          <button onClick={() => manageManager('from')}>from</button>
          <button onClick={() => manageManager('till')}>till</button>
        </div>
      </div>
      <Manager
        type={managerType}
        managerHandler={managerHandler}
        manageManager={manageManager}
      />
    </div>
  );
}

export default ProfilePilot;
