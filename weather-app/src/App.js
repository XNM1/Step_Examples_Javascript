import { Component } from 'react'
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import {
  WeatherState,
  Counter,
  ButtonTraffic
} from "./components/WeatherComponent";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Counter />
        <ButtonTraffic />
        <Button varitant="primary">Primary</Button>
        <WeatherState />
      </div>
    );
  }
}
