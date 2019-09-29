'use strict';

class Location {
	constructor(title, latitude, longitude) {
		this.title = title;
		this.latitude = latitude;
		this.longitude = longitude;
	}

	getCoords() {
		return [this.longitude, this.latitude];
	}
}

module.exports = Location;
