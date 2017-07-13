var TimerReducer = function(state = null, action){
    if(action.type === 'TIMER_TICK') {
        var time = action.payload

        return time.toLocaleTimeString()
    } else {
        return state
    }
}

export default TimerReducer