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
  render() {
    return (
      <div className="photo container">
        <Card>
          <CardText>
            {(() => {
              switch (this.state.is_captured) {
                case true:
                  return (
                    <canvas
                      id="canvas"
                      width={this.state.width}
                      height={this.state.height}
                    />
                  );

                case false:
                  return (
                    <video
                      id="video"
                      width={this.state.width}
                      height={this.state.height}
                    />
                  );
                default:
                  console.log("Nothing here...");
              }
            })()}
          </CardText>
        </Card>
        <div className="actions">
          <FlatButton primary={true} label="Capture" />
          <FlatButton primary={true} label="Retake" />
          <FlatButton primary={true} label="Switch Camera" />
        </div>
      </div>
    );
  }
}

export default App;
