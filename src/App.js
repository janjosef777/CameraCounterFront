import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Module } from 'module';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      lines: [],
      showData: false,
      productionOrder: {
        id: null,
        camerasMade: null,
        camerasFailed: null,
        dateDone: null,
        lineId: null
      }
    };
    this.fetchData = this.fetchData.bind(this)
    this.handleCamerasFailedChange = this.handleCamerasFailedChange.bind(this)
    this.handleCamerasMadeChange = this.handleCamerasMadeChange.bind(this)
    this.handleDateDoneChange = this.handleDateDoneChange.bind(this)
    this.handleProductionOrderIdChange = this.handleProductionOrderIdChange.bind(this)
    this.handleProductionOrderSubmit = this.handleProductionOrderSubmit.bind(this)
    this.handleLineIdChange = this.handleLineIdChange.bind(this)

  }

  fetchData() {
    fetch("https://localhost:44358/api/productionorders/1")
      .then(response => response.json())
      .then(data =>
        this.setState({
          productionOrder: {
            id: data.id,
            camerasMade: data.camerasMade,
            camerasFailed: data.camerasFailed,
            dateDone: data.dateDone,
            lineId : data.lineID
          }
        })
      )
      .then(
      )
  }
  componentDidMount() {
    this.fetchData()
  }

  handleProductionOrderIdChange(event) {
    this.setState({
      productionOrder:
      {
        ...this.state.productionOrder,
        id: event.target.value
      }
    })
  }
  handleCamerasFailedChange(event) {
    this.setState({
      productionOrder:
      {
        ...this.state.productionOrder,
        camerasFailed: event.target.value
      }
    })
  }
  handleCamerasMadeChange(event) {
    this.setState({
      productionOrder:
      {
        ...this.state.productionOrder,
        camerasMade: event.target.value
      }
    })
  }
  handleDateDoneChange(event) {
    this.setState({
      productionOrder:
      {
        ...this.state.productionOrder,
        dateDone: event.target.value
      }
    })
  }
  handleLineIdChange(event) {
    this.setState({
      productionOrder:
      {
        ...this.state.productionOrder,
        lineId: event.target.value
      }
    })
  }

  handleProductionOrderSubmit(event) {
    event.preventDefault()
    console.log(this.state.productionOrder.id)
    console.log(this.state.productionOrder.camerasMade)
    console.log(this.state.productionOrder.camerasFailed)
    console.log(this.state.productionOrder.lineId)
    fetch("https://localhost:44358/api/productionorders/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "Id": parseInt(this.state.productionOrder.id, 10),
        "camerasMade": parseInt(this.state.productionOrder.camerasMade,10),
        "camerasFailed": parseInt(this.state.productionOrder.camerasFailed,10),
        "dateDone": this.state.productionOrder.dateDone,
        "LineId": parseInt(this.state.productionOrder.lineId, 10)
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="shopping-list">
        <h1>{this.state.lines.map((line, i) => <div key={i}>{line.id}.) {line.name}</div>)}</h1>
        <ul>
          <form onSubmit={this.handleProductionOrderSubmit}>
            <label>
              Pr0#:
              <br />
              <input type="number" name="productionOrderId" vaule={this.state.productionOrder.id} onChange={this.handleProductionOrderIdChange} />
            </label>
            <br />
            <label>
              Cameras Made:
              <br />
              <input type="number" name="camerasMade" vaule={this.state.productionOrder.camerasMade} onChange={this.handleCamerasMadeChange} />
            </label>
            <br />
            <label>
              Cameras Failed:
              <br />
              <input type="number" name="camerasFailed" vaule={this.state.productionOrder.camerasFailed} onChange={this.handleCamerasFailedChange} />
            </label>
            <br />
            <label>
              Date Today:
              <br />
              <input type="date" name="dateDone" vaule={this.state.productionOrder.dateDone} onChange={this.handleDateDoneChange} />
            </label>
            <br />
            <br />
            <label>
              Line Number:
              <br />
              <input type="number" name="lineId" vaule={this.state.productionOrder.lineId} onChange={this.handleLineIdChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </ul>

      </div>
    );
  }
}
export default App;
