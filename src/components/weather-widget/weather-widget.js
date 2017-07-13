import React, {Component} from "react";
import axios from "axios";
import _ from 'lodash';

import ChangeCityButtons from "./change-city-buttons";
import Spinner from "./spinner";
import WeatherInformation from "./weather-information";

import "./weather-widget.pcss";

const cities = {
	omsk: 1496153,
	moscow: 5202009,
	newYork: 5128638
};

const API_KEY = "553baeedbafd8c0df291c4dad4e03fc1";
const query = `http://api.openweathermap.org/data/2.5/group?id=${cities.omsk},${cities.moscow},${cities.newYork}&units=metric`;

class Loader extends React.Component {
	render () {
		return (
			<div>
				{
					!this.props.isReady && <Spinner />
				}
				{
					this.props.isReady && this.props.children
				}
			</div>
		);
	}
}

export class WeatherWidget extends Component {

	constructor(props) {
		super(props);

		this.state = {
			index: 0,
			data: null
		};

		this.changeCity = this.changeCity.bind(this);
		this.launchGetData = this.launchGetData.bind(this);
	}

	componentDidMount() {
		this.launchGetData();
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (!(_.isEqual(this.state.data, nextState.data)) || this.state.index !== nextState.index);
	}

	componentWillUnmount() {
		clearTimeout(this.timer);
	}

	launchGetData(){
		this.getData(query);
		this.timer = setTimeout(this.launchGetData, 600000);
	}

	getData(CityQuery) {

		axios.get(CityQuery,
			{
				params: {
					appid: API_KEY,
					lang: "ru",
					units: "metric"
				}
			})
			.then(({ data })=> {
				this.setState({
					data: data.list
				});
			})
			.catch(function (error) {
				console.error(error);
			});
	}

	changeCity(index) {
		this.setState({
			index: index
		});
	}

	render() {

		const {data} = this.state;
		const {index} = this.state;
		const style = {textAlign: "center"};

		return (
			<div>
				<h1 className="main-title">Weather Widget Component</h1>

				<Loader isReady={data}>
					<div className="weather-widget__wrapper">
						<div className="weather-widget__wrapper_inner">
							<ChangeCityButtons
								index={index}
								changeCity={this.changeCity}
								data={data}
							/>

							<WeatherInformation
								index={index}
								data={data && data[index]}
							/>
						</div>
					</div>
				</Loader>

				<h2 className="subtitle" style={style}>Feel free to choose the city to get current forecast for it !</h2>
			</div>
		);
	}
}
