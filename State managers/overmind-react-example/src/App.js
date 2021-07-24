import logo from './logo.svg';
import './App.css';
import React from 'react'
import { createOvermind } from "overmind";
import { createStateHook, createActionsHook } from "overmind-react";

export const counterState = createOvermind({
  state: {
    count: 0,
    title: 'Hello world'
  },
  actions: {
    increment: ({state}) => state.count++,
    decrement: ({state}) => state.count--,
    increase: ({state}, n) => state.count += n,
    reset: ({state}) => state.count= 0
  }
});

const useCounterState = createStateHook();
const useCounterActions = createActionsHook();

function IncButton() {
  const counterActions = useCounterActions();
  return <button onClick={counterActions.increment}>Increment</button>;
}

function DecButton() {
  const counterActions = useCounterActions();
  return <button onClick={counterActions.decrement}>Decrement</button>;
}

function IncreaseButton() {
  const counterActions = useCounterActions();
  const nElement = React.useRef(null);
  return (
    <div>
      <input type="text" ref={nElement} style={{width: '20px'}}/>
      <button onClick={() => counterActions.increase(+nElement.current.value)}>Increase</button>
    </div>
  );
}

function ResetButton() {
  const counterActions = useCounterActions();
  return <button onClick={counterActions.reset}>Reset</button>;
}

function Label() {
  const counter = useCounterState();
  return <h1> Counter: {counter.count}, Title: {counter.title} </h1>;
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
