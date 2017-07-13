import React, { Component } from "react";
import _ from "lodash";

import { createStore } from '../../redux';

const initialState = {
	selected: 0
};

const changeTab = (state = {selected: 0}, index) => {
	return state.sleected = index;
};

const store = createStore(changeTab, initialState);

const render = () => {
	console.log('state changed ', store.getState());
};

store.subscribe(render);

export default class TabsInner extends Component {

	shouldComponentUpdate(nextProps, nextState) {
		return this.props !== nextProps || this.state.selected !== nextState.selected;
	}

	handleClick(index){
		console.log(index);
		store.dispatch(index);
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
