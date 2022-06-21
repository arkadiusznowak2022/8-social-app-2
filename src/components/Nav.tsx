import React from 'react';
import './Nav.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken, setToken } from '../redux/userSlice';
import { AppDispatch } from '../redux/store';

function Nav(): JSX.Element {
  const token = useSelector(selectToken);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(setToken(''));
    navigate('/');
  };

  return (
    <nav className='main-nav'>
      <h2>Chatterfield</h2>
      <ul>
        <Link className='nav-item' to='/'>
          Home
        </Link>

        {!token && (
          <Link className='nav-item' to='/login'>
            Log In
          </Link>
        )}

        {!token && (
          <Link className='nav-item' to='signup'>
            Sign Up!
          </Link>
        )}

        {token && (
          <button onClick={logout} className='nav-item'>
            Log out
          </button>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
