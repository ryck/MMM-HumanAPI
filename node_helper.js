"use strict";

/* Magic Mirror
 * Module: MMM-DHT-Sensor
 *
 * By Ricardo Gonzalez http://www.github.com/ryck/MMM-DHT-Sensor
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");
const	request = require("request");

module.exports = NodeHelper.create({

	start: function() {
		console.log("MMM-HumanAPI helper started ...");
	},

	/* getTimetable()
	 * Requests new data from HumanAPI.
	 * Sends data back via socket on succesfull response.
	 */
	getWellnessData: function(url) {
		var self = this;
		var retry = true;

		request({url:url, method: "GET"}, function(error, response, body) {
			if(!error && response.statusCode == 200) {
				self.sendSocketNotification("WELLNESS_DATA", {"result": JSON.parse(body), "url": url});
			} else {
				self.sendSocketNotification("WELLNESS_DATA", {"result": null, "url": url});
			}
		});
	},

	//Subclass socketNotificationReceived received.
	socketNotificationReceived: function(notification, payload) {
		if (notification === "GET_WELLNESS_DATA") {
			this.getWellnessData(payload.url);
		}
	}
});
