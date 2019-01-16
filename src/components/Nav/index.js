import React from 'react';
import { NavLink } from 'react-router-dom';

export const routes = {
  'home': {
    id: 'home',
    name: 'Home',
    path: '/'
  },
  'new-question': {
    id: 'add',
    name: 'Add a Question',
    path: '/add'
  },
  'leaderboard': {
    id: 'leaderboard',
    name: 'Leaderboard',
    path: '/leaderboard'
  },
  'logout': {
    id: 'logout',
    name: 'Logout',
    path: '/logout'
  },
};

const Nav = ({ path, user }) => {
  return (
    <ul className="Nav nav nav-pills nav-fill">
      {
        Object.values(routes).map((route) => (
          <li key={route.id} className="nav-item">
            <NavLink
              className="nav-link"
              exact activeClassName="active"
              to={route.path}>{route.name}
            </NavLink>
          </li>
        ))
      }
      <li className="nav-item">
        <div className="nav-link disabled">Hello, {user ? user.name : ''}</div>
      </li>
    </ul>
  );
};

export default Nav;
