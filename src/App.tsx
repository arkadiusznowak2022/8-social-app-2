import './App.css';
import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Nav from './components/Nav';
import SignUp from './pages/SignUp';
import LoggedOut from './pages/LoggedOut';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import { selectToken } from './redux/userSlice';
import Home from './pages/Home';

function App(): JSX.Element {
  const token: string = useSelector(selectToken);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route
          path='/'
          element={
            token ? (
              <Navigate replace to='home' />
            ) : (
              <Navigate replace to='loggedout' />
            )
          }
        />
        <Route path='/loggedout' element={<LoggedOut />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
