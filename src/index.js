import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <PicturePrev />
    </div>
  );
}
class PicPrevOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlayFlg: true,
      src:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII="
    };

    this.closeOverlay = this.closeOverlay.bind(this);
  }
  closeOverlay(e) {
    e.preventDefault();
    this.setState({ overlayFlg: false });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ overlayFlg: true });
  }

  render() {
    return (
      <div className="wrapper">
        {this.state.overlayFlg ? (
          <div className="overlay">
            <button
              className="cancel"
              onClick={event => {
                this.closeOverlay(event);
              }}
            >
              &#9747;
            </button>
            <div className="overlay-data">
              <img src={this.props.picSrc} alt="" />
              <div>
                <button className="button">Accept</button>
                <button
                  className="button"
                  onClick={event => {
                    this.closeOverlay(event);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
class PicturePrev extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: ""
    };
    this.fun = this.fun.bind(this);
  }
  fun(event) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = e => {
      var result = reader.result;
      this.setState({
        src: result
      });
    };
    event.target.value = "";
  }

  render() {
    return (
      <div>
        <input
          type="file"
          onInput={evt => this.fun(evt, new Date().getTime())}
          accept="image/*"
        />
        {/* <img src={this.state.src} alt="myImage" /> */}

        {this.state.src ? <PicPrevOverlay picSrc={this.state.src} /> : ""}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
