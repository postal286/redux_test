import React, { Component } from "react";
import _ from "lodash";

import { createStore } from 'redux';

const initialState = {
	selected: 0
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE_TAB':
			return { selected: action.payload.selected };
		default: return state;
	}
};

const store = createStore(reducer, initialState);

const getCurrentState = () => {
	console.log('state changed ', store.getState());
};

store.subscribe(getCurrentState);

export default class TabsInner extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		store.subscribe(() => this.forceUpdate());
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log(nextProps, nextState);
		return this.props !== nextProps || store.state.selected !== nextState.selected;
	}

	handleClick(index){
		let action = {type: 'CHANGE_TAB', payload: {selected: index} };
		store.dispatch(action);
	}

	_renderTitles() {
		const labels = (child, index) => {
			let activeClass = (store.getState().selected === index ? "tabs__tab__li_a_active" : "");

			return (
				<li key={index} className="tabs__tab__li">
					<a
						className={activeClass}
						onClick={this.handleClick.bind(this, index)}>
						{child.props.label}
					</a>
				</li>
			);
		};

		return (
			<ul className="tabs__tab">
				{_.map(this.props.children, labels)}
			</ul>
		);
	}

	_renderContent() {
		debugger;
		return (
			<div className="tab_content">
				{this.props.children[store.getState().selected]}
			</div>
		);
	}

	render() {
		return (
			<div className="tabs">
				{this._renderTitles()}
				{this._renderContent()}
			</div>
		);
	}
}
