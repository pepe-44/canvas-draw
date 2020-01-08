import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { blankMemes } from "./assets/blank_memes";
const CanvasTextWrapper = require("canvas-text-wrapper").CanvasTextWrapper;

const path = "./assets/blank/";

class App extends React.Component {
  state = {
    imageWidth: 0,
    imageHeight: 0,
    textTop: { value: "", x: 0, y: 0, width: 0, height: 0 },
    textBottom: { value: "", x: 0, y: 0, width: 0, height: 0 }
  };

  componentDidMount() {
    const canvas = this.refs.meme;
    const ctx = canvas.getContext("2d");
    const img = this.refs.img;
    img.onload = () => {
      this.setState({
        imageWidth: img.width,
        imageHeight: img.height
      });
      this.drawImage();
    };
  }

  componentDidUpdate() {
    // const canvas = this.refs.meme;
    // if (canvas) {
    //   const ctx = canvas.getContext("2d");
    //   console.log(ctx);
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);
    //   let widthText = ctx.measureText(this.state.textTop.value).width;
    //   this.drawImage();
    //   this.drawText(canvas, "top", "blue", this.state.textTop.value, widthText);
    // }
  }

  drawText = (canvas, alignText, color, text, widthText, options) => {
    const ctx = canvas.getContext("2d");

    let x = parseInt(canvas.width / 2) - widthText / 2;
    ctx.font = "40px Anton, sans-serif";
    let txtHeight = parseInt(ctx.font);
    this.setState(prevState => ({
      textTop: {
        ...prevState.textTop,
        x: x,
        y: txtHeight,
        width: widthText,
        height: 40
      }
    }));

    ctx.fillStyle = color;
    ctx.strokeStyle = "#111";
    ctx.fillText(text, x, txtHeight);
    // CanvasTextWrapper(canvas, text.toUpperCase(), {
    //     verticalAlign: alignText,
    //     allowNewLine: true,
    //     textAlign: "center",
    //
    //     strokeText: true,
    //     ...options
    // });
  };

  drawImage = () => {
    const canvas = this.refs.meme;
    const ctx = canvas.getContext("2d");
    const img = this.refs.img;

    let width = 600;
    let height = (this.state.imageHeight / this.state.imageWidth) * width;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(
      img,
      0,
      0,
      this.state.imageWidth,
      this.state.imageHeight,
      0,
      0,
      canvas.width,
      canvas.height
    );
  };

  textHittest = (x, y, textIndex) => {
    let text = this.state.textTop;
    console.log(text);
    return (
      x >= text.x &&
      x <= text.x + text.width &&
      y >= text.y - text.height &&
      y <= text.y
    );
  };
  handleMouseDown = e => {
    const canvas = this.refs.meme;
    const offset = canvas.getBoundingClientRect();
    e.preventDefault();
    let startX = parseInt(e.clientX - offset.left);
    let startY = parseInt(e.clientY - offset.top);
    let text = this.state.textTop.value;
    let selectedText = -1;
    // Put your mousedown stuff here
    for (var i = 0; i < text.length; i++) {
      if (this.textHittest(startX, startY, i)) {
        selectedText = i;
      }
    }
    console.log(selectedText);
  };

  changeTopText = e => {
    e.persist();
    this.setState(
      prevState => ({
        textTop: {
          ...prevState.textTop,
          value: e.target.value
        }
      }),
      () => {
        const canvas = this.refs.meme;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let widthText = ctx.measureText(this.state.textTop.value).width;
        this.drawImage();
        this.drawText(
          canvas,
          "top",
          "blue",
          this.state.textTop.value,
          widthText
        );
      }
    );
  };
  changeBottomText = e => {
    e.persist();
    this.setState(prevState => ({
      textBottom: {
        ...prevState.textBottom,
        value: e.target.value
      }
    }));
  };
  render() {
    return (
      <div className="App">
        <canvas ref="meme" onMouseDown={this.handleMouseDown}></canvas>
        <img
          src={path + blankMemes[0]}
          alt=""
          ref="img"
          style={{ display: "none" }}
        />
        <form action="">
          <label htmlFor=""></label>
          <input type="text" onChange={this.changeTopText} />
          <label htmlFor=""></label>
          <input type="text" onChange={this.changeBottomText} />
        </form>
      </div>
    );
  }
}

export default App;
