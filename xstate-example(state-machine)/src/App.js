import {
  createMachine
} from 'xstate';
import {
  useMachine
} from '@xstate/react';

import React from 'react'
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"

const traffic = createMachine({
  id: 'traffic',
  initial: 'red',
  states: {
    red: {
      on: {
        YELLOW: 'yellow'
      }
    },
    yellow: {
      on: {
        RED: 'red',
        GREEN: 'green'
      }
    },
    green: {
      on: {
        YELLOW: 'yellow'
      }
    },
  }
});

class TrafficLight {
  transitions = ['RED', 'YELLOW', 'GREEN', 'YELLOW'];
  transitionNum = 0;

  constructor() {
      makeAutoObservable(this);
  }


  next() {
      if (this.transitionNum === this.transitions.length - 1) this.transitionNum = 0;
      else this.transitionNum++;
      return this.transitions[this.transitionNum];
  }
}

class TrafficLightStarter {
  isCancel = false

  constructor(trafficLight) {
      makeAutoObservable(this);
      this.trafficLight = trafficLight;
  }

  start(delay, send) {
    this.isCancel = false;
    const fn = () => {
      if(this.isCancel) { clearTimeout(timer); return; }
      send(this.trafficLight.next());
      timer = setTimeout(fn, delay);
    }
    let timer = setTimeout(fn, delay);
  }

  stop() {
    this.isCancel = true;
  }
}

let trafficLight = new TrafficLight();
let trafficLightStarter = new TrafficLightStarter(trafficLight);

const TrafficLightComponent = observer((props) => {
  const [state, send] = useMachine(traffic);
  const refInputDelElement = React.useRef(null);

  React.useEffect(() => {
    if(!props.withControl && props.delay) trafficLightStarter.start(props.delay, send);
  }, []);
  let lightStyles = {
    position: 'relative',
    left: '45px',
    width: '100px',
    height: '100px',
    borderRadius: '50px'
  };
  return(
    <div>
      <div style={{
        backgroundColor: 'grey',
        width: '200px',
        height: '370px',
        borderRadius: '50px'
      }}>
        <div style={{
          backgroundColor: state.value === 'red' ? '#E53E3E' : '#FFF5F5',
          top: '20px',
          ...lightStyles
        }}
        ></div>
        <div style={{
          backgroundColor: state.value === 'yellow' ? '#F6E05E' : '#FFFFF0',
          top: '35px',
          ...lightStyles
        }}
        ></div>
        <div style={{
          backgroundColor: state.value === 'green' ? '#38A169' : '#F0FFF4',
          top: '50px',
          ...lightStyles
        }}
        ></div>
      </div>
      {(() => {
        if(props.withControl) return (
          <>
            <input type="text" ref={refInputDelElement}/>
            <button onClick={() => trafficLightStarter.start(+refInputDelElement.current.value, send)}>Start</button>
            <button onClick={() => trafficLightStarter.stop()}>Stop</button>
          </>
        );
      })()}
    </div>
  );
});

function App() {
  return <TrafficLightComponent withControl/>;
}

export default App;