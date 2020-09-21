import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import Reducers from './redux/reducers'
import {BrowserRouter} from 'react-router-dom'
import Thunk from 'redux-thunk'
ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(Reducers,{},applyMiddleware(Thunk))}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
