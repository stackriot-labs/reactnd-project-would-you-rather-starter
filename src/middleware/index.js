//import auth from './auth';
import thunk from 'redux-thunk';
import logger from './logger';
import { applyMiddleware } from 'redux';

export default applyMiddleware(
  thunk,
  logger,
//  auth
);
