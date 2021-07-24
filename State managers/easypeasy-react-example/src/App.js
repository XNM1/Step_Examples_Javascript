import logo from './logo.svg';
import './App.css';
import React from 'react'
import { createStore, useStoreActions, useStoreState, action, StoreProvider } from 'easy-peasy';

const $store = createStore({
  count: 0,
  title: "Hello world",
  
  increment: action(state => {
    state.count++;
  }),
  decrement: action(state => {
    state.count--;
  }),
  increase: action((state, n) => {
    state.count+=n;
  }),
  reset: action(state => {
    state.count = 0;
  }),
});

function IncButton() {
  const increment = useStoreActions((actions) => actions.increment);
  return <button onClick={increment}>Increment</button>;
}

function DecButton() {
  const decrement = useStoreActions((actions) => actions.decrement);
  return <button onClick={decrement}>Decrement</button>;
}

function IncreaseButton() {
  const increase = useStoreActions((actions) => actions.increase);
  const nElement = React.useRef(null);
  return (
    <div>
      <input type="text" ref={nElement} style={{width: '20px'}}/>
      <button onClick={() => increase(+nElement.current.value)}>Increase</button>
    </div>
  );
}

function ResetButton() {
  const reset = useStoreActions((actions) => actions.reset);
  return <button onClick={reset}>Reset</button>;
}

function Label() {
  const count = useStoreState((state) => state.count);
  const title = useStoreState((state) => state.title);
  return <h1> Counter: {count}, Title: {title} </h1>;
}

function App() {
  return (
    <StoreProvider store={$store}>
      <div className="App">
        <ResetButton/>
        <Label/>
        <IncButton/>
        <IncreaseButton/>
        <DecButton/>
      </div>
    </StoreProvider>
  );
}

export default App;
