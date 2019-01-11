import React from 'react';
import { NavLink } from 'react-router-dom';

export const routes = {
  'home': {
    id: 'home',
    name: 'Home',
    path: '/'
  },
  'new-question': {
    id: 'new-question',
    name: 'New Question',
    path: '/new-question'
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

const Nav = ({ path }) => {
  return (
    <ul className="Nav nav nav-pills nav-fill">
      {
        Object.values(routes).map((route) => (
          <li key={route.id} className="nav-item">
            <NavLink className="nav-link" exact activeClassName="active" to={route.path}>{route.name}</NavLink>
          </li>
        ))
      }
    </ul>
  );
};

export default Nav;
