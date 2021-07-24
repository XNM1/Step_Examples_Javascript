import { INCREMENT, INCREASE, DECREMENT, RESET } from './action_types.js'
import initialState from './initial_state.js'

function reducer(state = initialState, action) {
    switch(action.type) {
        case INCREMENT: return state + action.inc;
        case INCREASE: return state + action.value;
        case DECREMENT: return state - action.dec;
        case RESET: return 0;
        default: return state;
    }
}

export default reducer;