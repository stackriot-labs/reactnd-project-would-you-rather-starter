import * as API from '../utils/api';

export const SET_AUTHED_USER = 'SET_AUTHED_USER';

/*
The authedUser ID will either be a valid ID or null
*/
export const setAuthedUserAction = (id) => (
  {
    type: 'SET_AUTHED_USER',
    id
  }
);

export const setAuthedUser = (id) => (
  (dispatch) =>
  {
    API.getUsers()
      .then((users) => {
        const userId = users[id] ? id : null;
          dispatch(setAuthedUserAction(userId));
      });
  }
);
