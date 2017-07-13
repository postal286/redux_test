import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./input.pcss";

export class Input extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: ""
		};

		this.onInputChange = this.onInputChange.bind(this);
		this.clearInputValue = this.clearInputValue.bind(this);
		this.filterInputValue = this.filterInputValue.bind(this);
	}

	componentDidMount() {
		ReactDOM.findDOMNode(this.refs.firstInput).focus();
	}

	onInputChange(e) {
		this.setState({
			value: e.target.value
		});
	}

	clearInputValue(){
		this.setState({
			value: ""
		});
	}

	filterInputValue () {

		let	currentInputValue = this.state.value,
				regExpPat = /\d/g,
				newInputValueArray = currentInputValue.match(regExpPat),
				newInputValue;

		if (newInputValueArray) {
			newInputValue = newInputValueArray.join("");
		} else {
			newInputValue = "";
		}

		this.setState({
			value: newInputValue
		});
	}

	render() {
		return (
			<div>
				<h1 className="main-title">Little Component Input</h1>

				<h2 className="subtitle">Type something in and it automatically returns only numbers onblur !</h2>

				<p className="plain-text">
					This is your opportunity to provide information about all of the products you offer.
					Start the page with a brief overview or summary of your products and then list them below.
					If you have a large number of products or a lot of information about each product, you may
					want to think about separating them into categories and including a link to a landing page
					to learn more about an individual product.
				</p>

				<div className="input-filter-wrapper">
					<input placeholder='Type something...'
								 onBlur={this.filterInputValue}
								 value={this.state.value}
								 onChange={this.onInputChange}
								 className='input-filter'
								 ref='firstInput'
					/>
					<button
						onClick={this.clearInputValue}
						className="input-filter-clear"
					>
						Clear Input
					</button>
				</div>

				<p className="plain-text-small">
					If you create something, this is your opportunity to show it off to the world! Typically
					a must have page for designers, copywriters, photographers, artists, builders, etc.,
					the portfolio page is where you get to show off your work in any way you want and show
					your visitors what you can do.
				</p>

			</div>
		);
	}
}