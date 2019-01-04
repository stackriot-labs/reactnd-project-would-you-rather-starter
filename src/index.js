import App from './components/App';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { createStore } from 'redux';

const store = createStore(reducer);

ReactDOM.render(<App />, document.getElementById('root'));
