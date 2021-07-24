import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import store from './reduxCounterStore/store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, increase, reset } from './reduxCounterStore/counterSlice';

function IncButton() {
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(increment())}>Increment</button>;
}

function DecButton() {
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(decrement())}>Decrement</button>;
}

function IncreaseButton() {
  const dispatch = useDispatch();
  const nElement = React.useRef(null);
  return (
    <div>
      <input type="text" ref={nElement} style={{width: '20px'}}/>
      <button onClick={() => dispatch(increase(+nElement.current.value))}>Increase</button>
    </div>
  );
}

function ResetButton() {
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(reset())}>Reset</button>;
}

function Label() {
  const count = useSelector((state) => state.counter.count);
  const title = useSelector((state) => state.counter.title);
  return <h1> Counter: {count}, Title: {title}</h1>;
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ResetButton/>
        <Label/>
        <IncButton/>
        <IncreaseButton/>
        <DecButton/>
      </div>
    </Provider>
  );
}

export default App;
