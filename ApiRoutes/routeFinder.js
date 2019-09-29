const router = require('express').Router();
const csv = require('csv-parser');
const ors = require('openrouteservice-js');

csv({ separator: '\n' });
const fs = require('fs');
const RoutePlanner = require('../Util/RoutePlanner');
const directions = new ors.Directions({ api_key: process.env.OPENROUTE_API_KEY });

// to protect this route look into passport
router.get('/route', async (req, res, next) => {
	// const filename = req.params.filename; ENABLE AFTER FIXING CROSS ORIGIN
	const routePlanner = new RoutePlanner(); // ONLY NEED ONE PLANNER OBJECT ,
	const filename = 'small.csv';
	try {
		let route = [];

		fs.createReadStream(filename)
			.pipe(csv())
			.on('data', data => {
				routePlanner.addRoute(
					data['STREET'],
					Number.parseFloat(data['LON']),
					Number.parseFloat(data['LAT'])
				);
			})
			.on('end', async () => {
				// route = routePlanner.rawLocations();
				route = routePlanner.rawLocations();
				let opts = {
					coordinates: route, // list of coords
					extra_info: ['waytype', 'steepness'], // provides extras
					// avoidables: ['highways', 'tollways', 'ferries', 'fords'], // avoids specific feats
					format: 'json' // response format
				};
				const result = await directions.calculate(opts);
				res.send(result);
				// alternative
				/*
				directions.caluclate(opts).then((result) => {
					res.send(result);
				});
				*/
			});
	} catch (err) {
		next(err);
	}
});

module.exports = router;
