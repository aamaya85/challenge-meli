'use strict'

module.exports = (app) => {
	
	const dataController = require('../controllers/data-controller');

	// Routes
	app.route('/topsecret')
		.get(dataController.getLocation)

	app.route('/topsecret_split/:satellite_name')
		.get(dataController.getLocation_split_1)

}