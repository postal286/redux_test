import React, {Component} from "react";

import "./app.pcss";


import Tabs from "tabs";

export default class App extends Component {
	render() {
		return (
			<div className="container">
				<div className="app">

					<Tabs/>

				</div>
			</div>
		);
	}
}