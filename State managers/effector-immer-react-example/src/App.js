import logo from './logo.svg';
import './App.css';
import React from 'react'
import {createStore, createApi} from 'effector';
import {useStore} from 'effector-react';
import produce from "immer";

const $store = createStore({
  count: 0,
  title: "Hello world"
});

const CounterApi = createApi($store, {
  increment: produce(state => {
    state.count++;
  }),
  decrement: produce(state => {
    state.count--;
  }),
  increase: produce((state, n) => {
    state.count+=n;
  }),
  reset: produce(state => {
    state.count = 0;
  }),
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
  const store = useStore($store);
  return <h1> Counter: {store.count}, Title: {store.title} </h1>;
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
