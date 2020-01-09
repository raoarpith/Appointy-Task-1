import React from "react";
import ReactDOM from "react-dom";
import { DebounceInput } from "react-debounce-input";

class GetDimensions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Height: "",
      Width: "",
      Background: "",
      BorderColor: [""],
      BorderStyle: {
        borderStyle: "hidden",
        borderColor: "hidden",
        width: "",
        height: "",
        backgroundColor: "black",
        borderWidth: ""
      },

      items: [],
      isLoaded: false
    };

    this.handleHeightChange = this.handleHeightChange.bind(this);
    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
    this.handleBorderChange = this.handleBorderChange.bind(this);
  }

  handleHeightChange(e) {
    this.setState({ Height: e.target.value });
    this.setState({
      BorderStyle: {
        borderStyle: "solid",
        borderColor: this.state.BorderStyle.borderColor,
        width: this.state.BorderStyle.width,
        height: parseInt(e.target.value),
        backgroundColor: this.state.BorderStyle.backgroundColor,
        borderWidth: "thick"
      }
    });
  }

  handleWidthChange(e) {
    this.setState({ Width: e.target.value });
    this.setState({
      BorderStyle: {
        borderStyle: "solid",
        borderColor: this.state.BorderStyle.borderColor,
        width: parseInt(e.target.value),
        height: this.state.BorderStyle.height,
        backgroundColor: this.state.BorderStyle.backgroundColor,
        borderWidth: "thick"
      }
    });
  }

  handleBackgroundChange(e) {
    if (e.target.value === "random") {
      let hex = "#" + this.state.items.colors[0].hex;
      this.setState({ Background: hex });

      this.setState({
        BorderStyle: {
          borderStyle: "solid",
          borderColor: this.state.BorderStyle.borderColor,
          width: this.state.BorderStyle.width,
          height: this.state.Height,
          backgroundColor: hex,
          borderWidth: "thick"
        }
      });

      console.log(this.state.items.colors[0].hex);
    } else {
      this.setState({ Background: e.target.value });

      this.setState({
        BorderStyle: {
          borderStyle: "solid",
          borderColor: this.state.BorderStyle.borderColor,
          width: this.state.BorderStyle.width,
          height: this.state.BorderStyle.height,
          backgroundColor: e.target.value,
          borderWidth: "thick"
        }
      });
    }
  }

  componentDidMount() {
    fetch("http://www.colr.org/json/color/random")
      .then(res => res.json())
      .then(json => {
        this.setState({ isLoaded: true, items: json });
      });
  }
  handleBorderChange(e) {
    let newVal = e.target.value;

    let stateVal = this.state.BorderColor;

    let width = parseInt(this.state.Width);

    let height = parseInt(this.state.Height);

    let backgroundColor = this.state.Background;

    stateVal.indexOf(newVal) === -1
      ? stateVal.push(newVal)
      : stateVal.length === 1
      ? (stateVal = [])
      : stateVal.splice(stateVal.indexOf(newVal), 1);

    this.setState({
      BorderColor: stateVal
    });

    this.setState({
      BorderStyle: {
        borderStyle: "solid",
        borderColor: stateVal.join(" "),
        width: width,
        height: height,
        backgroundColor: backgroundColor,
        borderWidth: "thick"
      }
    });
  }

  render() {
    return (
      <form>
        <label>
          Height:
          <DebounceInput
            debounceTimeout={1000}
            type="text"
            value={this.state.Height}
            onChange={this.handleHeightChange}
          />
        </label>
        <br />
        <br />

        <label>
          Width:
          <DebounceInput
            debounceTimeout={1000}
            type="text"
            value={this.state.Width}
            onChange={this.handleWidthChange}
          />
        </label>
        <br />
        <br />

        <label>
          Background:
          <select
            value={this.state.Background}
            onChange={this.handleBackgroundChange}
          >
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="random">Random</option>
          </select>
        </label>
        <br />
        <br />

        <label>
          Border:
          <select
            multiple={true}
            value={this.state.BorderColor}
            onChange={this.handleBorderChange}
          >
            <option value="black">Black</option>
            <option value="yellow">Yellow</option>
            <option value="purple">Purple</option>
          </select>
        </label>
        <br />
        <br />

        <br />

        <hr />
        <div style={this.state.BorderStyle}></div>
      </form>
    );
  }
}

ReactDOM.render(<GetDimensions />, document.getElementById("root"));
