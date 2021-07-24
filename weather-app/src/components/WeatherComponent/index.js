import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup } from "react-bootstrap";

export class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div onClick={this.increment.bind(this)}>
        <h1>Hello {this.state.count}</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
    );
  }
}

export class ButtonTraffic extends Component {
  constructor(props) {
    super(props);
    this.traffic = ["red", "yellow", "green"];
    this.states = [0, 1, 2, 1];
    this.state = {
      currentState: 0
    };
  }

  increment() {
    this.setState({
      currentState:
        this.state.currentState === 3 ? 0 : this.state.currentState + 1
    });
  }

  render() {
    return (
      <button
        style={{
          width: "100px",
          height: "100px",
          background: this.traffic[this.states[this.state.currentState]]
        }}
        onClick={this.increment.bind(this)}
      ></button>
    );
  }
}

class WeatherCard extends Component {
  render() {
    return (
        <ListGroup horizontal>
          <ListGroup.Item>{this.props.temp}</ListGroup.Item>
          <ListGroup.Item>{this.props.hum}</ListGroup.Item>
        </ListGroup>
    );
  }
}

export class WeatherState extends Component {
  constructor(props) {
    super(props);
    this.state = null;
    this.timer = null;
  }

  getData() {
    fetch(
      "https://community-open-weather-map.p.rapidapi.com/forecast?q=san%20francisco%2Cus",
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "83eae3db6emsh556aa4a4d737577p16b150jsnd1ae8dcd55e0",
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
        }
      }
    )
      .then(response => response.json())
      .then(result => {
        this.setState({
          city: result.city.name,
          country: result.city.country,
          list: result.list
        });
        //console.log(result);
      })
      .catch((err) => {
        //console.error(err);
        this.setState({
          error: "Error load data"
        });
      });
  }

  componentDidMount() {
    this.timer = setInterval(() => this.getData(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    if (!this.state) return <div>Loading...</div>;
    if(this.state.error) return <div>{this.state.error}</div>;
    return (
      <div>
        <h2>{this.state.country}</h2>
        <h2>{this.state.city}</h2>
        <ListGroup horizontal>
          <ListGroup.Item>Temp</ListGroup.Item>
          <ListGroup.Item>Humidity</ListGroup.Item>
        </ListGroup>
        {this.state.list.map((e) => (
          <WeatherCard temp={e.main.temp} hum={e.main.humidity} />
        ))}
      </div>
    );
  }
}
