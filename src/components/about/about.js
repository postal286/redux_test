import React, { Component } from "react";

export class About extends Component {
	render(){
		return(
			<div>
				<h1 className="main-title">About</h1>
				<h2 className="subtitle">Thanks for coming !</h2>

				<p className="plain-text">
					This is your opportunity to provide information about all of the products you offer.
					Start the page with a brief overview or summary of your products and then list them below.
					If you have a large number of products or a lot of information about each product, you may
					want to think about separating them into categories and including a link to a landing page
					to learn more about an individual product.
				</p>

				<div className="diamond-wrapper">
					<div className="diamond"></div>
				</div>

				<p className="plain-text-small">
					If you create something, this is your opportunity to show it off to the world! Typically
					a must have page for designers, copywriters, photographers, artists, builders, etc.,
					the portfolio page is where you get to show off your work in any way you want and show
					your visitors what you can do.
				</p>

				<div className="diamond-wrapper">
					<div className="diamond"></div>
				</div>

				<p className="plain-text">
					What to include: An overview about the business including the history of the business,
					information about the business officers, if your a solopreneur a bio and photo,
					any awards or special recognition you have received, and your unique points of differentiation.
				</p>
			</div>
		);
	}
}