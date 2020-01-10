import React from "react";
import ReactDOM from "react-dom";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.handleClear = this.handleClear.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperand = this.handleOperand.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
  }

  // set state to default on pressing Clear button
  handleClear() {
    this.setState(defaultState);
  }

  handleNumber(e) {
    // handle numbers too large for display
    if (this.state.display.length > 10) {
      this.setState({
        display: "TOO LARGE",
        input: "",
        operandUsed: false,
        lastInputOperand: false,
        clearState: true,
        lastInputEquals: false,
        decimalUsed: false
      });
      return;
    }

    // do nothing if the person presses zero after Clear or Equals
    if (e.target.value == "0") {
      if (this.state.clearState || this.state.lastInputEquals) {
        return;
      }
    }

    // handle first number
    if (this.state.clearState || this.state.lastInputEquals) {
      this.setState({
        input: e.target.value,
        display: e.target.value,
        clearState: false,
        operandUsed: false,
        lastInputEquals: false
      });

      //handle first number after an operand
    } else if (this.state.lastInputOperand) {
      this.setState({
        input: this.state.input.concat(e.target.value),
        display: e.target.value,
        lastInputOperand: false,
        lastInputEquals: false
      });

      // handle additional numbers
    } else {
      if (this.state.display == "5800" && e.target.value == "8") {
        this.setState({
          display: "BOOOOOOOBS!!!"
        });
      } else {
        this.setState({
          input: this.state.input.concat(e.target.value),
          display: this.state.display.concat(e.target.value),
          lastInputEquals: false
        });
      }
    }
  }

  handleDecimal(e) {
    if (this.state.lastInputEquals || this.state.clearState) {
      console.log("triggered");
      this.setState({
        display: "0.",
        input: e.target.value,
        lastInputOperand: false,
        operandUsed: false,
        lastInputEquals: false,
        decimalUsed: true,
        clearState: false
      });
    } else if (this.state.lastInputOperand) {
      this.setState({
        display: "0.",
        input: this.state.input.concat(e.target.value),
        lastInputOperand: false,
        decimalUsed: true
      });
    } else if (!this.state.decimalUsed) {
      this.setState({
        input: this.state.input.concat(e.target.value),
        display: this.state.display.concat(e.target.value),
        lastInputEquals: false,
        decimalUsed: true
      });
    }
  }

  handleOperand(e) {
    // handle initial minus sign
    if (!this.state.input && e.target.value == " - ") {
      this.setState({
        input: e.target.value,
        display: "-",
        clearState: false
      });
    }

    // do nothing if an operand is the first button pushed
    if (this.state.input) {
      // handle first operand used
      if (!this.state.operandUsed) {
        this.setState({
          input: this.state.input.concat(e.target.value),
          lastInputOperand: true,
          operandUsed: true,
          lastInputEquals: false,
          decimalUsed: false
        });

        // overwrite previous operand if two used consecutively
      } else if (this.state.lastInputOperand) {
        if (e.target.value == " - ") {
          this.setState({
            input: this.state.input.concat(" - ")
          });
        } else {
          let regex = /[+*\-\/\s]/g;
          let newInput = this.state.input
            .replace(regex, "")
            .concat(e.target.value);
          this.setState({
            input: newInput
          });
        }

        // perform calculations when multiple operands are used before equals
      } else {
        let result = eval(this.state.input).toFixed(4);
        result = parseFloat(result).toString(10);
        if (result.length > 12) {
          this.setState({
            display: "RESULT TOO LARGE",
            input: "",
            operandUsed: false,
            lastInputOperand: false,
            clearState: true,
            lastInputEquals: false
          });
        }
        this.setState({
          display: result,
          input: result.concat(e.target.value),
          lastInputOperand: true,
          lastInputEquals: false
        });
      }
    }
  }

  handleEquals() {
    let result = eval(this.state.input).toFixed(4);
    result = parseFloat(result).toString(10);
    if (result.length > 12) {
      this.setState({
        display: "RESULT TOO LARGE",
        input: "",
        operandUsed: false,
        lastInputOperand: false,
        clearState: true,
        lastInputEquals: false
      });
    }
    if (this.state.operandUsed && !this.state.lastInputOperand) {
      this.setState({
        input: result,
        display: result,
        lastInputEquals: true,
        operandUsed: false
      });
    }
  }

  render() {
    return (
      <div id="calculator-body">
        <div id="display">{this.state.display}</div>
        <div id="test-display">{this.state.input}</div>
        <div id="keypad">
          <button
            className="btn btn-danger"
            id="clear"
            onMouseDown={e => e.preventDefault()}
            onClick={this.handleClear}
          >
            Clear
          </button>
          <button
            className="btn btn-warning"
            id="divide"
            onMouseDown={e => e.preventDefault()}
            value=" / "
            onClick={this.handleOperand}
          >
            /
          </button>
          <button
            className="btn btn-warning"
            id="multiply"
            onMouseDown={e => e.preventDefault()}
            value=" * "
            onClick={this.handleOperand}
          >
            x
          </button>
          <button
            className="btn btn-secondary"
            id="seven"
            onMouseDown={e => e.preventDefault()}
            value="7"
            onClick={this.handleNumber}
          >
            7
          </button>
          <button
            className="btn btn-secondary"
            id="eight"
            onMouseDown={e => e.preventDefault()}
            value="8"
            onClick={this.handleNumber}
          >
            8
          </button>
          <button
            className="btn btn-secondary"
            id="nine"
            onMouseDown={e => e.preventDefault()}
            value="9"
            onClick={this.handleNumber}
          >
            9
          </button>
          <button
            className="btn btn-warning"
            id="subtract"
            onMouseDown={e => e.preventDefault()}
            value=" - "
            onClick={this.handleOperand}
          >
            -
          </button>
          <button
            className="btn btn-secondary"
            id="four"
            onMouseDown={e => e.preventDefault()}
            value="4"
            onClick={this.handleNumber}
          >
            4
          </button>
          <button
            className="btn btn-secondary"
            id="five"
            onMouseDown={e => e.preventDefault()}
            value="5"
            onClick={this.handleNumber}
          >
            5
          </button>
          <button
            className="btn btn-secondary"
            id="six"
            onMouseDown={e => e.preventDefault()}
            value="6"
            onClick={this.handleNumber}
          >
            6
          </button>
          <button
            className="btn btn-warning"
            id="add"
            onMouseDown={e => e.preventDefault()}
            value=" + "
            onClick={this.handleOperand}
          >
            +
          </button>
          <button
            className="btn btn-secondary"
            id="one"
            onMouseDown={e => e.preventDefault()}
            value="1"
            onClick={this.handleNumber}
          >
            1
          </button>
          <button
            className="btn btn-secondary"
            id="two"
            onMouseDown={e => e.preventDefault()}
            value="2"
            onClick={this.handleNumber}
          >
            2
          </button>
          <button
            className="btn btn-secondary"
            id="three"
            onMouseDown={e => e.preventDefault()}
            value="3"
            onClick={this.handleNumber}
          >
            3
          </button>
          <button
            className="btn btn-info"
            id="equals"
            onMouseDown={e => e.preventDefault()}
            onClick={this.handleEquals}
          >
            =
          </button>
          <button
            className="btn btn-secondary"
            id="zero"
            onMouseDown={e => e.preventDefault()}
            value="0"
            onClick={this.handleNumber}
          >
            0
          </button>
          <button
            className="btn btn-secondary"
            id="decimal"
            onMouseDown={e => e.preventDefault()}
            value="."
            onClick={this.handleDecimal}
          >
            .
          </button>
        </div>
      </div>
    );
  }
}

const defaultState = {
  input: "",
  display: "0",
  operandUsed: false,
  lastInputOperand: false,
  clearState: true,
  lastInputEquals: false,
  decimalUsed: false
};

ReactDOM.render(<Calculator />, document.getElementById("root"));
