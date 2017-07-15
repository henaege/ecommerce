import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import {createStore, applyMiddleware} from 'redux'

import {Provider} from 'react-redux'

import reducers from './reducers/rootReducer'
// import redux-promise for our AJAX
import reduxPromise from 'redux-promise'

// const theStore = createStore(reducers)
const theStore = applyMiddleware(reduxPromise)(createStore)(reducers)

// ReactDOM .render takes 2 args: What, Where
ReactDOM.render(
    <Provider store={theStore}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
