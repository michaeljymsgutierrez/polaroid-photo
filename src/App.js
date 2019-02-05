import React, { Component } from "react";
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      devices: [],
      height: "100%",
      width: "100%"
    };
  }
  componentDidMount = () => {
    /**
     * Initialize Data
     */
    this.rollCamera();
    navigator.mediaDevices
      .enumerateDevices()
      .then(success => {
        let DEVICES = [];
        success.forEach(value => {
          if (value.kind === "videoinput") {
            DEVICES.push(value);
          }
        });
        this.setState({ devices: DEVICES });
      })
      .catch(err => {
        console.log(err);
      });
  };
  rollCamera = () => {
    /**
     *  Roll Camera Function
     */
    let video = document.getElementById("video");
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: "environment",
            deviceId: { exact: this.state.devices[1] }
          }
        })
        .then(
          stream => {
            video.srcObject = stream;
            video.play();
          },
          error => {
            console.log(error);
          }
        );
    }
  };
  render() {
    return (
      <div className="photo container">
        <video id="video" width={this.state.width} height={this.state.height} />
        {/* <canvas
          id="canvas"
          width={this.state.width}
          height={this.state.height}
        /> */}
        {/* <video id="video" width="568" height="450" /> */}
        {/* <canvas id="canvas" width="568" height="426" /> */}
      </div>
    );
  }
}

export default App;
