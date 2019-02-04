import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }
  componentDidMount = () => {
    /**
     * Initialize Data
     */
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
          this.setState({ message: JSON.stringify(stream) });
          video.srcObject = stream;
          video.play();
        },
        error => {
          this.setState({ message: JSON.stringify(error) });
        }
      );
    }
  };
  render() {
    return (
      <div className="photo">
        {this.state.message}
        <video id="video" width="568" height="450" />
        <canvas id="canvas" width="568" height="426" />
      </div>
    );
  }
}

export default App;
