import readline from 'readline-sync';
import store from './redux/store.js';
import { RESET } from './redux/action_types.js'
import { increment, decrement } from './redux/actions.js'
import { increaseCreator } from './redux/action_creators.js'

store.subscribe(() => {
    console.log('Count: ', store.getState());
});

let isExit = false;
while (!isExit) {
    const answer = readline.question('');
    if (answer == '+') {
        store.dispatch(increment);
    }
    else if (answer == '-') {
        store.dispatch(decrement);
    }
    else if(answer == 'reset') {
        store.dispatch({ type: RESET });
    }
    else if (Number.isInteger(+answer)) {
        store.dispatch(increaseCreator(+answer));
    }
    else if (answer == 'exit') {
        isExit = true;
    }
}