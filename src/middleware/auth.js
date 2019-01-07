import { setAuthedUser } from '../actions/authedUser';

const AUTHED_ID = 'tylermcginnis';

const auth = (store) => (next) => (action) => {
  /*
  /login is the only guest path. For all others, the authUser must be set.
  Not exactly perfect security, although there's no way we'd get close to
  perfection doing all this on the frontend anyway.
  */

 // Manually set the authed user for now
 store.dispatch(setAuthedUser(AUTHED_ID));

  if(window.location.pathname !== '/login'){
    if(!store.getState().authedUser){
      window.location = '/login';
    }
  }
};

export default auth;
