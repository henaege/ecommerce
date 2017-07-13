// This is our master reducer. The Root reducer. The reducers hold pieces of state. The Root reducer holds all the reducers (the Root reducer holds all pieces of state, or application state)

// We need to get the combineReducers method from Redux to make a rootReducer that the Provider can use

import {combineReducers} from 'redux'

// Import each reducer here

import CartReducer from './CartReducer'

import TimerReducer from './TimerReducer'


// create a rootReducer using the combineReducer method so we can export it to the store in index.js
const rootReducer = combineReducers({
    // Inside here, we pass each reducer as a key-value pair. Each key will be available as a piece of state later
    cartItems: CartReducer,
    timer: TimerReducer

})

export default rootReducer