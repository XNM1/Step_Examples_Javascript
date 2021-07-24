import logo from './logo.svg';
import './App.css';
import React from 'react'
import {createStore, createApi} from 'effector';
import {useStore} from 'effector-react';

const $counter = createStore(0);

const CounterApi = createApi($counter, {
  increment: state => state + 1,
  decrement: state => state - 1,
  increase: (state, n) => state + n,
  reset: state => 0
});

function IncButton() {
  return <button onClick={CounterApi.increment}>Increment</button>;
}

function DecButton() {
  return <button onClick={CounterApi.decrement}>Decrement</button>;
}

function IncreaseButton() {
  const nElement = React.useRef(null);
  return (
    <div>
      <input type="text" ref={nElement} style={{width: '20px'}}/>
      <button onClick={() => CounterApi.increase(+nElement.current.value)}>Increase</button>
    </div>
  );
}

function ResetButton() {
  return <button onClick={CounterApi.reset}>Reset</button>;
}

function Label() {
  let counter = useStore($counter);
  return <h1> Counter: {counter} </h1>;
}

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
