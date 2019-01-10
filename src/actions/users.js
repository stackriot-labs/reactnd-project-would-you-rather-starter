import { showLoading, hideLoading } from 'react-redux-loading';
import * as API from '../utils/api';

export const GET_USERS = 'GET_USERS';

export const getUsersAction = (users) => ({
  type: GET_USERS,
  users,
});

export const getUsers = () => (
  (dispatch) => {
    dispatch(showLoading());
    return API.getUsers()
      .then((users) => {
        dispatch(getUsersAction(users));
        dispatch(hideLoading());
      });
    }
);
