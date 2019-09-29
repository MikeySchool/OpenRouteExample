'use strict';
const Location = require('./Location');

class RoutePlanner {
	constructor() {
		this.locationList = [];
		this.rawLocation = [];
		this.result = {};
	}

	rawLocations() {
		return this.rawLocation;
	}

	addRoute(title, longitude, latitude) {
		const location = new Location(title, latitude, longitude);
		this.locationList.push(location);
		this.rawLocation.push(location.getCoords());
	}
}

module.exports = RoutePlanner;
