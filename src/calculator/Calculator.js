import React from "react";
import "./Calculator.css";

const nums = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[0]
];
const operations = ["+", "-", "*", "/"];

const makeButtonFrom = (thing, onClickHandler) => (
	<button
		className="calculator-button"
		onClick={() => onClickHandler(thing)}>
		{thing}
	</button>
);

const CalculatorDisplay = (props) => <div>{props.result}</div>;

const NumberPad = (props) => {
	const numberButtons = nums.map(row => row.map(number => makeButtonFrom(number, props.clickHandler)));
	return (
		<div>
			{numberButtons.map(row => (<div>{row}</div>))}
		</div>
	);
}

const OperatorButtons = (props) => (
	<div>
		{operations.map(op => makeButtonFrom(op, props.clickHandler))}
	</div>
);

export default class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			leftOperand: 0,
			rightOperand: 0,
			operation: undefined
		};

		this.chooseNumber = this.chooseNumber.bind(this);
		this.chooseOperator = this.chooseOperator.bind(this);
		this.calculate = this.calculate.bind(this);
		this.clear = this.clear.bind(this);
		this.backspace = this.backspace.bind(this);
	}

	render() {
		const resultToDisplay = this.state.operation ? this.state.rightOperand : this.state.leftOperand;
		return (
			<div>
				<CalculatorDisplay result={resultToDisplay} />
				<div>
					{makeButtonFrom("=", this.calculate)}
					{makeButtonFrom("CLEAR", this.clear)}
					{makeButtonFrom("<", this.backspace)}
				</div>
				<NumberPad clickHandler={this.chooseNumber} />
				<OperatorButtons clickHandler={this.chooseOperator} />
			</div>
		);
	}

	chooseNumber(number) {
		if (!Number.isInteger(number)) {
			throw new Error("not a number.");
		}

		if (this.state.operation === undefined) {
			this.setState({ leftOperand: Number('' + this.state.leftOperand + number) });
		} else {
			this.setState({ rightOperand: Number('' + this.state.rightOperand + number) });
		}
	}

	chooseOperator(operator) {
		if (!operations.includes(operator)) {
			throw new Error("not a valid operator.");
		}

		this.setState({ operation: operator });
	}

	clear() {
		this.setState({
			leftOperand: 0,
			rightOperand: 0,
			operation: undefined
		});
	}

	backspace() {
		if(this.state.operation === undefined) {
			this.setState({leftOperand: removeLastDigitEntered(this.state.leftOperand)});
		} else {
			this.setState({rightOperand: removeLastDigitEntered(this.state.leftOperand)});
		}

		function removeLastDigitEntered(number){
			const stringifiedNumber = String(number);
			const shorterNumber = stringifiedNumber.substring(0, stringifiedNumber.length - 1);
			if(shorterNumber.length === 0){
				return 0;
			} else {
				return Number(shorterNumber);
			}
		}
	}

	calculate() {
		const leftOperand = this.state.leftOperand;
		const rightOperand = this.state.rightOperand;
		let result;
		switch (this.state.operation) {
			case undefined:
				return;
			case "+":
				result = leftOperand + rightOperand;
				break;
			case "-":
				result = leftOperand - rightOperand;
				break;
			case "*":
				result = leftOperand * rightOperand;
				break;
			case "/":
				result = leftOperand / rightOperand;
				break;
			default:
				throw new Error("invalid operator:" + this.state.operation);
		}
		this.setState({
			leftOperand: result,
			rightOperand: 0,
			operation: undefined
		});
	}
}
