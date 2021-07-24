import logo from './logo.svg';
import './App.css';
import React from 'react';
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";

class Counter {
    count = 0
    title = 'Hello world'

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

const $counter = new Counter();

function IncButton() {
  return <button onClick={() => $counter.increment()}>Increment</button>;
}

function DecButton() {
  return <button onClick={() => $counter.decrement()}>Decrement</button>;
}

function IncreaseButton() {
  const nElement = React.useRef(null);
  return (
    <div>
      <input type="text" ref={nElement} style={{width: '20px'}}/>
      <button onClick={() => $counter.increase(+nElement.current.value)}>Increase</button>
    </div>
  );
}

function ResetButton() {
  return <button onClick={() => $counter.reset()}>Reset</button>;
}

const Label = observer(() => {
  return <h1> Counter: {$counter.count}, Title: {$counter.title} </h1>;
});

function App() {
  return (
    <div className="App">
      <ResetButton/>
      <Label/>
      <IncButton/>
      <IncreaseButton/>
      <DecButton/>
    </div>
  );
}

export default App;