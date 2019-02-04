import React, { Component } from "react";

class App extends Component {
  componentDidMount = () => {
    this.rollCamera();
  };
  rollCamera = () => {
    /**
     *  Roll Camera Function
     */
    let video = document.getElementById("video");
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(
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
      <div className="photo">
        <video id="video" width="568" height="450" />
        <canvas id="canvas" width="568" height="426" />
      </div>
    );
  }
}

export default App;
