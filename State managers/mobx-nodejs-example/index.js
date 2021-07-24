import readline from 'readline-sync';
import { makeAutoObservable, autorun } from "mobx";

class Counter {
    count = 0

    constructor() {
        makeAutoObservable(this)
    }

    increment() {
        this.count++;
    }

    decrement() {
        this.count--;
    }

    increase(n) {
        this.count += n;
    }

    reset() {
        this.count = 0;
    }
}

const counter = new Counter();

autorun(() => {
    console.log("Count: ", counter.count)
})

let isExit = false;
while (!isExit) {
    const answer = readline.question('');
    if (answer == '+') {
        counter.increment();
    }
    else if (answer == '-') {
        counter.decrement();
    }
    else if(answer == 'reset') {
        counter.reset();
    }
    else if (Number.isInteger(+answer)) {
        counter.increase(+answer);
    }
    else if (answer == 'exit') {
        isExit = true;
    }
}