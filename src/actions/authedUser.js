import * as API from '../utils/api';

export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const REMOVE_AUTHED_USER = 'REMOVE_AUTHED_USER';

/*
The authedUser ID will either be a valid ID or null
*/
export const setAuthedUserAction = (id) => (
  {
    type: SET_AUTHED_USER,
    id
  }
);

export const removeAuthedUserAction = () => (
  {
    type: REMOVE_AUTHED_USER,
    id: null
  }
);

export const setAuthedUser = (id) => (
  (dispatch) =>
  {
    return API.getUsers()
      .then((users) => {
        const userId = users[id] ? id : null;
          dispatch(setAuthedUserAction(userId));
      });
  }
);

export const removeAuthedUser = () => (
  (dispatch) =>
  {
    dispatch(setAuthedUserAction(null));
  }
);
