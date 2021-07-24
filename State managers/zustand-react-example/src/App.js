import logo from './logo.svg';
import './App.css';
import React from 'react';
import create from 'zustand';

const useCounterStore = create(set => ({
  count: 0,

  increment: () => set(state => ({ count: state.count + 1})),
  decrement: () => set(state => ({ count: state.count - 1})),
  increase: (n) => set(state => ({ count: state.count + n})),
  reset: () => set(state => ({ count: 0})),
}))

function IncButton() {
  const increment = useCounterStore(state => state.increment);
  return <button onClick={increment}>Increment</button>;
}

function DecButton() {
  const decrement = useCounterStore(state => state.decrement);
  return <button onClick={decrement}>Decrement</button>;
}

function IncreaseButton() {
  const increase = useCounterStore(state => state.increase);
  const nElement = React.useRef(null);
  return (
    <div>
      <input type="text" ref={nElement} style={{width: '20px'}}/>
      <button onClick={() => increase(+nElement.current.value)}>Increase</button>
    </div>
  );
}

function ResetButton() {
  const reset = useCounterStore(state => state.reset);
  return <button onClick={reset}>Reset</button>;
}

function Label() {
  const count = useCounterStore(state => state.count);
  return <h1> Counter: {count} </h1>;
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