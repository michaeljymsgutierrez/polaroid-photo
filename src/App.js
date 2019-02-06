import React, { Component } from "react";
import { Card, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      devices: [],
      height: "100%",
      width: "100%",
      is_captured: false
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
            if (this.state.is_captured === false) {
              let video = document.getElementById("video");
              video.srcObject = stream;
              video.play();
            }
          },
          error => {
            console.log(error);
          }
        );
    }
  };
  capturePhoto = () => {
    this.setState({ is_captured: true });
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    let video = document.getElementById("video");
    context.drawImage(video, 0, 0, 568, 426);
    // context.drawImage(video, 0, 0, this.state.width, this.state.height);
  };
  render() {
    return (
      <div className="photo container">
        <div className="polaroid">
          <Card>
            <CardText>
              <video
                id="video"
                width={this.state.width}
                height={this.state.height}
              />
            </CardText>
          </Card>
        </div>
        <div className="actions">
          <FlatButton
            primary={true}
            label="Capture"
            onClick={this.capturePhoto}
          />
          <FlatButton primary={true} label="Retake" />
          <FlatButton primary={true} label="Switch Camera" />
        </div>
        <canvas id="canvas" height="400" width="595" />
      </div>
    );
  }
}

export default App;
