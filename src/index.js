import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import {createStore} from 'redux'

import {Provider} from 'react-redux'

import reducers from './reducers/rootReducer'

const theStore = createStore(reducers)

// ReactDOM .render takes 2 args: What, Where
ReactDOM.render(
    <Provider store={theStore}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
