const request = require('request');

module.exports = (address, callback) => {
	var encodedAddress = encodeURIComponent(address);
	request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDGaB-M0-o_PK8l-z6B5pYv1KgFt1Q4gH8`,
        json: true
	}, (error, response, body) => {
        if (error) {
            callback('Unable to connect to servers.');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find location. Try another search.');
        } else if (body.status === 'OK') {
            const result = body.results[0]
            callback(undefined, {
                location : result.formatted_address,
                latitude : result.geometry.location.lat,
                longitude : result.geometry.location.lng
            });
        }
	});
}

//d939bda84646fc2ea2b80a7eaf57bf01